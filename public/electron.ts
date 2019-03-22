import { app, BrowserWindow, shell } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";

import initElectronHelpers from "./electron_modules/ElectronHelpers";
import initGit from "./electron_modules/Git";
import Menu from "./electron_modules/Menu";

let mainWindow: BrowserWindow | null = null;
let menu: Menu;

// prevent opening new windows
app.on("web-contents-created", (event, contents) => {
    contents.on("new-window", (event, navigationUrl) => {
        event.preventDefault();

        // check if the user wants to open the dev-tools
        if (navigationUrl.split(":")[0] !== "chrome-devtools") {
            // ask the operating system to open the url in the default browser
            shell.openExternal(navigationUrl);
        }
    });
});

function createWindow() {
    // create the window
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        minHeight: 600,
        minWidth: 800,
        backgroundColor: "#414141",
        titleBarStyle: "hidden",
        title: "Branch",
        webPreferences: {
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            contextIsolation: false,
            preload: __dirname + "/preload.js"
        }
    });

    // init the electron helpers
    initElectronHelpers(mainWindow);
    initGit(mainWindow);

    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => (mainWindow = null));

    // create the menu
    menu = new Menu();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
