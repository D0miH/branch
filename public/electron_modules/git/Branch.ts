import { GitProcess } from "dugite";
import { IpcMessageEvent, ipcMain } from "electron";

import Repository from "./Repository";
import { ReturnObject, ErrorCode } from "./ReturnObject";

export default class Branch {
    repo: Repository;

    constructor(repo: Repository) {
        addIpcListener(this);
        this.repo = repo;
    }

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
}

function addIpcListener(branch: Branch) {
    ipcMain.on("get-checked-out-branch", (event: IpcMessageEvent) => branch.getCheckedOutBranch(event));
}
