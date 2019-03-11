import { ipcMain, dialog, BrowserWindow } from "electron";

var browserWindow: BrowserWindow;

export default function initElectronHelpers(mainWindow: BrowserWindow) {
    browserWindow = mainWindow;
}

ipcMain.on("open-file-dialog", (event: any) => {
    let workingDir = dialog.showOpenDialog(browserWindow, {
        properties: ["openDirectory"]
    });
    event.returnValue = workingDir;
});
