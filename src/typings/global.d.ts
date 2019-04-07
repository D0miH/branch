import { IpcRenderer } from "electron";
import { PromisifiedIpcRenderer } from "promisify-electron-ipc/lib/renderer";

declare global {
    interface Window {
        ipcRenderer: IpcRenderer;
        promiseIpcRenderer: PromisifiedIpcRenderer;
    }
}
