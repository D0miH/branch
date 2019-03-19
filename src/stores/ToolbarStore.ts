import { observable } from "mobx";

export default class ToolbarStore {
    @observable repoListVisible: boolean = false;
}
