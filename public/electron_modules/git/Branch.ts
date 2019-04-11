import { GitProcess } from "dugite";
import { promiseIpcMain } from "promisify-electron-ipc";

import Repository from "./Repository";
import { ErrorCode, ErrorMessages, ReturnObject } from "./ReturnObject";

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
    getCheckedOutBranch() {
        if (this.repo.pathToRepo === null) {
            return Promise.resolve(new ReturnObject("", ErrorCode.NoValidPathGiven));
        }

        return GitProcess.exec(["rev-parse", "--abbrev-ref", "HEAD"], this.repo.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                // tslint:disable-next-line: no-console
                console.log(GitProcess.parseError(result.stderr));
                return new ReturnObject("", ErrorCode.UnknownError);
            }

            // remove the empty line break
            return new ReturnObject(result.stdout.split("\n")[0]);
        });
    }

    /**
     * Checks out the given branch. The function returns true if the checkout was successful, otherwise it returns false.
     * @param event The given IpcMessageEvent to return the result.
     * @param branchName The name of the branch which is going to be checked out.
     */
    checkoutBranch(branchName: string) {
        if (this.repo.pathToRepo === null) {
            return Promise.resolve(new ReturnObject("", ErrorCode.NoValidPathGiven));
        }

        return GitProcess.exec(["checkout", branchName], this.repo.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                if (result.stderr.includes(ErrorMessages.localChangesWouldBeOverwritten)) {
                    return new ReturnObject(false, ErrorCode.LocalChangesPreventCheckout);
                }

                // tslint:disable-next-line: no-console
                console.log(GitProcess.parseError(result.stderr));
                return new ReturnObject(false, ErrorCode.UnknownError);
            }

            return new ReturnObject(true);
        });
    }
}

function addIpcListener(branch: Branch) {
    promiseIpcMain.on("get-checked-out-branch", () => branch.getCheckedOutBranch());

    promiseIpcMain.on("checkout-branch", (branchName: string) => branch.checkoutBranch(branchName));
}
