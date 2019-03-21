import { observable, action } from "mobx";
import { toast } from "react-toastify";
import Commit from "./Commit";

export default class RepositoryStore {
    @observable currentRepoName: string = "";

    @observable localBranches: string[] = [];
    @observable remoteBranches: string[] = [];
    @observable tags: string[] = [];
    @observable stashes: string[] = [];
    @observable commitHistory: Commit[] = [];

    @action openRepo(repoPath: string) {
        // open the repo
        let result: GitReturnObject = window.ipcRenderer.sendSync("open-repo", repoPath);

        if (result.errorCode !== 0) {
            if (result.errorCode === 2) {
                // if no git repository was found notify the user about it
                toast.error("No git repository found", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true
                });
                console.log("toastified");
                return;
            }

            console.error(`An error occurred while opening the repository (Error code ${result.errorCode})`);
            return;
        }

        this.currentRepoName = result.value as string;

        this.localBranches = this.getLocalBranches();
        this.remoteBranches = this.getRemoteBranches();

        this.tags = this.getTags();

        this.stashes = this.getStashes();

        this.commitHistory = this.getCommitHistory("master");
    }

    getLocalBranches(): string[] {
        // get all the local branches
        let result: GitReturnObject = window.ipcRenderer.sendSync("get-local-branches");

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the local branches (Error code: ${result.errorCode}) `);
            return [];
        }

        return result.value as string[];
    }

    getRemoteBranches(): string[] {
        // get all the remote branches
        let result: GitReturnObject = window.ipcRenderer.sendSync("get-remote-branches");

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the remote branches (Error code: ${result.errorCode}) `);
            return [];
        }

        return result.value as string[];
    }

    getTags(): string[] {
        let result: GitReturnObject = window.ipcRenderer.sendSync("get-tags");

        if (result.errorCode !== 0) {
            console.error(
                `Error occurred while retrieving the tags of the repository (Error code: ${result.errorCode}) `
            );
            return [];
        }

        return result.value as string[];
    }

    getStashes(): string[] {
        let result: GitReturnObject = window.ipcRenderer.sendSync("get-stashes");

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the stashes (Error code: ${result.errorCode}) `);
            return [];
        }

        return result.value as string[];
    }

    getCommitHistory(branchName: string): Commit[] {
        let result: GitReturnObject = window.ipcRenderer.sendSync("get-commit-history", branchName);

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the commit history (Error code: ${result.errorCode}) `);
            return [];
        }

        let commitHistory = result.value as {
            hash: string;
            author: string;
            relativeAuthorDate: string;
            commitTitle: string;
        }[];
        let returnArray: Commit[] = [];

        // iterate the commit history and create a new commit for each
        commitHistory.forEach(commit => {
            returnArray.push(new Commit(commit.hash, commit.author, commit.relativeAuthorDate, commit.commitTitle));
        });

        return returnArray;
    }
}
