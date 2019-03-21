import { IpcRenderer } from "electron";
import { ReturnObject, ErrorCode } from "../public/electron_modules/git/ReturnObject";
import Commit from "../public/electron_modules/git/Commit";

declare global {
    interface Window {
        ipcRenderer: IpcRenderer;
    }

    interface GitReturnObject extends ReturnObject {}
    interface GitErrorCode extends ErrorCode {}
    interface GitCommit extends Commit {}
}
