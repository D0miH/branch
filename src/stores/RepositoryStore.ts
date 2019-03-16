import { observable } from "mobx";

export default class RepositoryStore {
    @observable currentRepoName: string = "";
}
