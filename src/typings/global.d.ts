import { PromisifiedIpcRenderer } from "promisify-electron-ipc/lib/renderer";

declare global {
    interface Window {
        promiseIpcRenderer: PromisifiedIpcRenderer;
    }
}
