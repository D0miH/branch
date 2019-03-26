import { observable, reaction, toJS, action } from "mobx";
import getLocalStorageInstance, { LocalStorage } from "./LocalStorage";

export default class ToolbarStore {
    localStorage: LocalStorage;

    constructor() {
        this.localStorage = getLocalStorageInstance();
    }

    @observable repoListVisible: boolean = false;
    @observable repoList: { repoName: string; repoPath: string }[] = [];

    @action addRepoToList(repoName: string, repoPath: string) {
        // check if the repository is already in the list
        if (this.repoList.filter(repo => repo.repoPath === repoPath).length === 0) {
            this.repoList.push({
                repoName: repoName,
                repoPath: repoPath
            });
        }
    }

    reactToRepoListChange = reaction(
        () => this.repoList.length,
        length => {
            this.localStorage.repoList = toJS(this.repoList);
        }
    );
}
