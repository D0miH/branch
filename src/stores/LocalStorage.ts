import { observable, autorun } from "mobx";

export class LocalStorage {
    @observable repoList: { repoName: string; repoPath: string }[] = [];
}

const localStorage = new LocalStorage();

export default function getLocalStorageInstance() {
    return localStorage;
}
