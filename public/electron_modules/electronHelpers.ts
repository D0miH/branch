import { ipcMain, dialog, BrowserWindow, IpcMessageEvent } from "electron";

var browserWindow: BrowserWindow;

export default function initElectronHelpers(mainWindow: BrowserWindow) {
    browserWindow = mainWindow;
}

ipcMain.on("open-file-dialog", (event: IpcMessageEvent) => {
    let workingDir = dialog.showOpenDialog(browserWindow, {
        properties: ["openDirectory"]
    })[0];
    event.returnValue = workingDir;
});
