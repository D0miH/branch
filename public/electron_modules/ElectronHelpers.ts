import { BrowserWindow, dialog } from "electron";
import { promiseIpcMain } from "promisify-electron-ipc";

let browserWindow: BrowserWindow;

export default function initElectronHelpers(mainWindow: BrowserWindow) {
    browserWindow = mainWindow;
}

promiseIpcMain.on("open-file-dialog", () => {
    const workingDir = dialog.showOpenDialog(browserWindow, {
        properties: ["openDirectory"]
    });
    return Promise.resolve(workingDir !== undefined ? workingDir[0] : null);
});
