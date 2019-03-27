import { observable, reaction, toJS, action } from "mobx";
import getLocalStorageInstance, { LocalStorage } from "./LocalStorage";
import { RepoListItem } from "../@types/GitTypes";

export default class ToolbarStore {
    localStorage: LocalStorage;

    constructor() {
        this.localStorage = getLocalStorageInstance();

        // load the saved repository list
        this.repoList = this.localStorage.loadRepoList();
    }

    @observable repoListVisible: boolean = false;
    @observable repoList: RepoListItem[] = [];

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
