import { observable, action } from "mobx";
import { toast } from "react-toastify";
import GitStore from "../GitStore";
import { GitReturnObject, GitCommit } from "../../typings/git-types";

export default class RepositoryStore {
    gitStore: GitStore;

    @observable currentRepoName: string = "";

    @observable localBranches: string[] = [];
    @observable remoteBranches: string[] = [];
    @observable tags: string[] = [];
    @observable stashes: string[] = [];
    @observable commitHistory: GitCommit[] = [];

    constructor(gitStore: GitStore) {
        this.gitStore = gitStore;
    }

    @action openRepo(repoPath: string) {
        // open the repo
        let result: GitReturnObject = window.ipcRenderer.sendSync("open-repo", repoPath);

        if (result.errorCode !== 0) {
            if (result.errorCode === 2) {
                // if no git repository was found notify the user about it
                toast.error("No git repository found");
                return;
            }

            console.error(`An error occurred while opening the repository (Error code ${result.errorCode})`);
            return;
        }

        this.currentRepoName = result.value as string;

        this.updateLocalBranchList();
        this.updateRemoteBranchList();

        this.updateTagList();

        this.updateStashList();

        this.gitStore.branchStore.getCheckedOutBranch();
        this.updateCommitHistory(this.gitStore.branchStore.checkedOutBranch);
    }

    updateLocalBranchList() {
        // get all the local branches
        let result: GitReturnObject = window.ipcRenderer.sendSync("get-local-branches");

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the local branches (Error code: ${result.errorCode}) `);
            return [];
        }

        this.localBranches = result.value as string[];
    }

    updateRemoteBranchList() {
        // get all the remote branches
        let result: GitReturnObject = window.ipcRenderer.sendSync("get-remote-branches");

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the remote branches (Error code: ${result.errorCode}) `);
            return [];
        }

        this.remoteBranches = result.value as string[];
    }

    updateTagList() {
        let result: GitReturnObject = window.ipcRenderer.sendSync("get-tags");

        if (result.errorCode !== 0) {
            console.error(
                `Error occurred while retrieving the tags of the repository (Error code: ${result.errorCode}) `
            );
            return [];
        }

        this.tags = result.value as string[];
    }

    updateStashList() {
        let result: GitReturnObject = window.ipcRenderer.sendSync("get-stashes");

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the stashes (Error code: ${result.errorCode}) `);
            return [];
        }

        this.stashes = result.value as string[];
    }

    updateCommitHistory(branchName: string) {
        let result: GitReturnObject = window.ipcRenderer.sendSync("get-commit-history", branchName);

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the commit history (Error code: ${result.errorCode}) `);
            return [];
        }

        this.commitHistory = result.value as GitCommit[];
    }

    pullRepository() {
        let result: GitReturnObject = window.ipcRenderer.sendSync("pull-all");

        if (result.errorCode !== 0) {
            if (
                result.value.includes("error: Your local changes to the following files would be overwritten by merge:")
            ) {
                toast.error("Local changes prevent pull");
            }
            console.error(`Error occured while pulling (Error code: ${result.errorCode})`);
            return [];
        }

        // parse the lines and remove the last empty line
        let lines = result.value.split("\n") as string[];
        lines.splice(-1, 1);

        lines.forEach(line => {
            if (line.includes("Already up to date")) {
                toast.success("Already up to date");
            } else if (/files changed|.+ insertions\(\+\)|.+ deletions\(\+\)/.test(line)) {
                toast.success(`Successfully pulled`);
            }
        });

        // update the commit list
        this.updateCommitHistory(this.gitStore.branchStore.checkedOutBranch);
    }
}
