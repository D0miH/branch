import { observable, action } from "mobx";
import { ReturnObject } from "../../public/electron_modules/git/ReturnObject";

export default class RepositoryStore {
    @observable currentRepoName: string = "";

    @observable localBranches: string[] = [];
    @observable remoteBranches: string[] = [];
    @observable tags: string[] = [];
    @observable stashes: string[] = [];

    @action openRepo(repoPath: string) {
        // open the repo
        let repoName: ReturnObject = window.ipcRenderer.sendSync("open-repo", repoPath);

        if (repoName.errorCode !== 0) {
            console.log("no git repo");
            return;
        }

        this.currentRepoName = repoName.value as string;

        this.localBranches = this.getLocalBranches();
        this.remoteBranches = this.getRemoteBranches();

        this.tags = this.getTags();

        this.stashes = this.getStashes();
    }

    getLocalBranches(): string[] {
        // get all the local branches
        let result: ReturnObject = window.ipcRenderer.sendSync("get-local-branches");

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the local branches (Error code: ${result.errorCode}) `);
            return [];
        }

        return result.value as string[];
    }

    getRemoteBranches(): string[] {
        // get all the remote branches
        let result = window.ipcRenderer.sendSync("get-remote-branches");

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the remote branches (Error code: ${result.errorCode}) `);
            return [];
        }

        return result.value as string[];
    }

    getTags(): string[] {
        let result = window.ipcRenderer.sendSync("get-tags");

        if (result.errorCode !== 0) {
            console.error(
                `Error occurred while retrieving the tags of the repository (Error code: ${result.errorCode}) `
            );
            return [];
        }

        return result.value as string[];
    }

    getStashes(): string[] {
        let result = window.ipcRenderer.sendSync("get-stashes");

        if (result.errorCode !== 0) {
            console.error(`Error occurred while retrieving the stashes (Error code: ${result.errorCode}) `);
            return [];
        }

        return result.value as string[];
    }
}
