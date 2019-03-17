import { IpcRenderer } from "electron";
import { ReturnObject as RetObj } from "../public/electron_modules/git/ReturnObject";

declare global {
    interface Window {
        ipcRenderer: IpcRenderer;
    }

    interface ReturnObject extends RetObj {}
}
