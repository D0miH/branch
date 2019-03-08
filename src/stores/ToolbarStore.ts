import { observable } from "mobx";
import { IToolbarStore } from "./stores";

class ToolbarStore implements IToolbarStore {
    @observable repoListVisible: boolean = false;
}

export default ToolbarStore;
