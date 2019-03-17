import { observable, action } from "mobx";

export default class RepositoryStore {
    @observable currentRepoName: string = "";

    @observable localBranches: string[] = [];
    @observable remoteBranches: string[] = [];
    @observable tags: string[] = [];
    @observable stashes: string[] = [];

    @action openRepo(repoPath: string) {
        // open the repo
        let repoName = window.ipcRenderer.sendSync("open-repo", repoPath);
        if (repoName === null) {
            // the user cancelled the dialog or there was no git repo found
            console.log("no git repo");
            return;
        }

        this.currentRepoName = repoName;

        this.localBranches = this.getLocalBranches();
        this.remoteBranches = this.getRemoteBranches();

        let tags = this.getTags();
        this.tags = tags !== null ? tags : [];

        let stashes = this.getStashes();
        this.stashes = stashes !== null ? stashes : [];
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

    getStashes(): string[] {
        return window.ipcRenderer.sendSync("get-stashes");
    }
}
