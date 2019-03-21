import { observable, action } from "mobx";
import GitStore from "../GitStore";

export default class Branch {
    gitStore: GitStore;

    @observable checkedOutBranch: string = "";

    constructor(gitStore: GitStore) {
        this.gitStore = gitStore;
    }

    @action getCheckedOutBranch() {
        let result: GitReturnObject = window.ipcRenderer.sendSync("get-checked-out-branch");

        if (result.errorCode !== 0) {
            console.error(
                `Error occurred while retrieving the currently checked out branch (Error code: ${result.errorCode}) `
            );
            this.checkedOutBranch = "";
        }

        this.checkedOutBranch = result.value as string;
    }
}
