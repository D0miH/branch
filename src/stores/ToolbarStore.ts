import { action, observable, reaction, toJS } from "mobx";
import { IGitRepoListItem } from "../typings/git-types";
import getLocalStorageInstance, { LocalStorage } from "./LocalStorage";

export default class ToolbarStore {
    localStorage: LocalStorage;

    @observable repoListVisible: boolean = false;
    @observable repoList: IGitRepoListItem[] = [];

    reactToRepoListChange = reaction(
        () => this.repoList.length,
        length => {
            this.localStorage.repoList = toJS(this.repoList);
        }
    );

    constructor() {
        this.localStorage = getLocalStorageInstance();

        // load the saved repository list
        this.repoList = this.localStorage.loadRepoList();
    }

    @action addRepoToList(repoName: string, repoPath: string) {
        // check if the repository is already in the list
        if (this.repoList.filter(repo => repo.repoPath === repoPath).length === 0) {
            this.repoList.push({
                repoName: repoName,
                repoPath: repoPath
            });
        }
    }
}
