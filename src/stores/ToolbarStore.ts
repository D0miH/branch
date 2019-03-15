import { observable } from "mobx";
import { IToolbarStore } from "./store-types";

class ToolbarStore implements IToolbarStore {
    @observable repoListVisible: boolean = false;
}

export default ToolbarStore;
