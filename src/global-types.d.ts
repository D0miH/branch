import { IpcRenderer } from "electron";
import { ReturnObject, ErrorCode } from "../public/electron_modules/git/ReturnObject";
import Commit from "../public/electron_modules/git/Commit";
import { GitErrorCode } from ".";

declare global {
    interface Window {
        ipcRenderer: IpcRenderer;
    }

    interface GitReturnObject {
        value: any;
        errorCode: GitErrorCode;
    }

    interface GitCommit extends Commit {}
}
