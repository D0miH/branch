import { observable, action } from "mobx";
import GitStore from "../GitStore";
import { toast } from "react-toastify";
import { GitReturnObject, GitErrorCode } from "../../typings/git-types";

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

    @action checkOutBranch(branchName: string) {
        let result: GitReturnObject = window.ipcRenderer.sendSync("checkout-branch", branchName);

        if (result.errorCode !== 0) {
            if (result.errorCode === GitErrorCode.LocalChangesPreventCheckout) {
                toast(
                    "Because of unsaved local changes the branch could not be checked out! \n Please commit or stash your changes.",
                    { type: toast.TYPE.ERROR }
                );
                return;
            }

            console.error(
                `Error occurred while checking out the branch ${branchName} (Error code: ${result.errorCode}) `
            );
            this.checkedOutBranch = "";
        }

        // if the branch could be checked out update the branch name
        this.checkedOutBranch = branchName;

        // update the commit history
        this.gitStore.repoStore.updateCommitHistory(branchName);

        toast(`Successfully checked out ${branchName}`, { type: toast.TYPE.SUCCESS });
    }
}
