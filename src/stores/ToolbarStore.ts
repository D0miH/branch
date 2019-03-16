import { observable } from "mobx";

class ToolbarStore {
    @observable repoListVisible: boolean = false;
}

export default ToolbarStore;
