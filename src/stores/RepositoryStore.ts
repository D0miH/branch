import { observable, action } from "mobx";

export default class RepositoryStore {
    @observable currentRepoName: string = "";

    @observable localBranches: string[] = [];
    @observable remoteBranches: string[] = [];
    @observable tags: string[] = [];

    @action openRepo(repoPath: string) {
        // open the repo
        let repoName = window.ipcRenderer.sendSync("open-repo", repoPath);
        this.currentRepoName = repoName;

        this.localBranches = this.getLocalBranches();
        this.remoteBranches = this.getRemoteBranches();
        this.tags = this.getTags();
    }

    getLocalBranches(): string[] {
        // get all the local branches
        return window.ipcRenderer.sendSync("get-local-branches");
    }

    getRemoteBranches(): string[] {
        // get all the remote branches
        return window.ipcRenderer.sendSync("get-remote-branches");
    }

    getTags(): string[] {
        return window.ipcRenderer.sendSync("get-tags");
    }
}
