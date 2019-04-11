import { BrowserWindow, dialog, ipcMain, IpcMessageEvent } from "electron";

let browserWindow: BrowserWindow;

export default function initElectronHelpers(mainWindow: BrowserWindow) {
    browserWindow = mainWindow;
}

ipcMain.on("open-file-dialog", (event: IpcMessageEvent) => {
    const workingDir = dialog.showOpenDialog(browserWindow, {
        properties: ["openDirectory"]
    });
    event.returnValue = workingDir !== undefined ? workingDir[0] : null;
});
