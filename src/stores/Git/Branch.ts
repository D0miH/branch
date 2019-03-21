import { observable, action } from "mobx";

export default class Branch {
    @observable checkedOutBranch: string = "";

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
