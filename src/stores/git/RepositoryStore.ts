import { action, observable } from "mobx";
import { toast } from "react-toastify";
import { IGitCommit, IGitReturnObject } from "../../typings/git-types";
import GitStore from "../GitStore";
import getLocalStorageInstance from "../LocalStorage";

export default class RepositoryStore {
    gitStore: GitStore;

    @observable currentRepoName: string = "";

    @observable localBranches: string[] = [];
    @observable remoteBranches: string[] = [];
    @observable tags: string[] = [];
    @observable stashes: string[] = [];
    @observable commitHistory: IGitCommit[] = [];

    constructor(gitStore: GitStore) {
        this.gitStore = gitStore;
    }

    @action async openRepo(repoPath: string) {
        // open the repo
        const result: IGitReturnObject = await window.promiseIpcRenderer.send("open-repo", repoPath);

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

        // set the current opened repo as the last opened repo
        getLocalStorageInstance().lastOpenedRepo = { repoName: this.currentRepoName, repoPath: repoPath };

        await this.updateLocalBranchList();
        await this.updateRemoteBranchList();

        this.updateTagList();

        this.updateStashList();

        await this.gitStore.branchStore.getCheckedOutBranch();
        this.updateCommitHistory(this.gitStore.branchStore.checkedOutBranch);
    }

    async updateLocalBranchList() {
        // get all the local branches
        const result: IGitReturnObject = await window.promiseIpcRenderer.send("get-local-branches");

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the local branches (Error code: ${result.errorCode}) `);
            return [];
        }

        this.localBranches = result.value as string[];
    }

    async updateRemoteBranchList() {
        // get all the remote branches
        const result: IGitReturnObject = await window.promiseIpcRenderer.send("get-remote-branches");

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the remote branches (Error code: ${result.errorCode}) `);
            return [];
        }

        this.remoteBranches = result.value as string[];
    }

    updateTagList() {
        const result: IGitReturnObject = window.ipcRenderer.sendSync("get-tags");

        if (result.errorCode !== 0) {
            console.error(
                `Error occurred while retrieving the tags of the repository (Error code: ${result.errorCode}) `
            );
            return [];
        }

        this.tags = result.value as string[];
    }

    updateStashList() {
        const result: IGitReturnObject = window.ipcRenderer.sendSync("get-stashes");

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the stashes (Error code: ${result.errorCode}) `);
            return [];
        }

        this.stashes = result.value as string[];
    }

    updateCommitHistory(branchName: string) {
        const result: IGitReturnObject = window.ipcRenderer.sendSync("get-commit-history", branchName);

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the commit history (Error code: ${result.errorCode}) `);
            return [];
        }

        this.commitHistory = result.value as IGitCommit[];
    }

    async pullRepository() {
        window.promiseIpcRenderer.send("pull-all").then((result: IGitReturnObject) => {
            if (result.errorCode !== 0) {
                if (
                    result.value.includes(
                        "error: Your local changes to the following files would be overwritten by merge:"
                    )
                ) {
                    toast.error("Local changes prevent pull");
                }
                console.error(`Error occured while pulling (Error code: ${result.errorCode})`);
                return [];
            }

            // parse the lines and remove the last empty line
            const lines = result.value.split("\n") as string[];
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
        });
    }
}
