import { GitProcess } from "dugite";
import { IpcMessageEvent, ipcMain } from "electron";

import Repository from "./Repository";
import { ReturnObject, ErrorCode, ErrorMessages } from "./ReturnObject";

export default class Branch {
    repo: Repository;

    constructor(repo: Repository) {
        addIpcListener(this);
        this.repo = repo;
    }

    /**
     * Returns the name of the currently checked out branch.
     * @param event The given IpcMessageEvent to return the result.
     */
    getCheckedOutBranch(event: IpcMessageEvent) {
        if (this.repo.pathToRepo === null) {
            event.returnValue = new ReturnObject("", ErrorCode.NoValidPathGiven);
            return;
        }

        GitProcess.exec(["rev-parse", "--abbrev-ref", "HEAD"], this.repo.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                console.log(GitProcess.parseError(result.stderr));
                event.returnValue = new ReturnObject("", ErrorCode.UnknownError);
                return;
            }

            // remove the empty line break
            event.returnValue = new ReturnObject(result.stdout.split("\n")[0]);
        });
    }

    /**
     * Checks out the given branch. The function returns true if the checkout was successful, otherwise it returns false.
     * @param event The given IpcMessageEvent to return the result.
     * @param branchName The name of the branch which is going to be checked out.
     */
    checkoutBranch(event: IpcMessageEvent, branchName: string) {
        if (this.repo.pathToRepo === null) {
            event.returnValue = new ReturnObject("", ErrorCode.NoValidPathGiven);
            return;
        }

        GitProcess.exec(["checkout", branchName], this.repo.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                if (result.stderr.includes(ErrorMessages.localChangesWouldBeOverwritten)) {
                    event.returnValue = new ReturnObject(false, ErrorCode.LocalChangesPreventCheckout);
                    return;
                }

                console.log(GitProcess.parseError(result.stderr));
                event.returnValue = new ReturnObject(false, ErrorCode.UnknownError);
                return;
            }

            event.returnValue = new ReturnObject(true);
        });
    }
}

function addIpcListener(branch: Branch) {
    ipcMain.on("get-checked-out-branch", (event: IpcMessageEvent) => branch.getCheckedOutBranch(event));

    ipcMain.on("checkout-branch", (event: IpcMessageEvent, branchName: string) =>
        branch.checkoutBranch(event, branchName)
    );
}
