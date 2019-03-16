import { observable, action } from "mobx";
import { getPackedSettings } from "http2";

export default class RepositoryStore {
    @observable currentRepoName: string = "";

    @observable localBranches: string[] = [];
    @observable remotes: string[] = [];
    @observable tags: string[] = [];

    @action openRepo(repoPath: string) {
        // open the repo
        let repoName = window.ipcRenderer.sendSync("open-repo", repoPath);
        this.currentRepoName = repoName;

        // get all the local branches
        this.getLocalBranches();
        // get all the remote branches
        this.getRemoteBranches();
        // get all the tags
        this.getTags();
    }

    @action getLocalBranches() {
        // get all the local branches
        let branches: string[] = window.ipcRenderer.sendSync(
            "get-local-branches"
        );
        console.log(branches);
    }

    @action getRemoteBranches() {
        // get all the remote branches
        let branches: string[] = window.ipcRenderer.sendSync(
            "get-remote-branches"
        );
        console.log(branches);
    }

    @action getTags() {
        let tags: string[] = window.ipcRenderer.sendSync("get-tags");
        console.log(tags);
    }
}
