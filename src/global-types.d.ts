import { IpcRenderer } from "electron";
import { ReturnObject, ErrorCode } from "../public/electron_modules/git/ReturnObject";

declare global {
    interface Window {
        ipcRenderer: IpcRenderer;
    }

    interface GitReturnObject extends ReturnObject {}
    interface GitErrorCode extends ErrorCode {}
}
