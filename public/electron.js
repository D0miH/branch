const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

// prevent opening new windows
app.on("web-contents-created", (event, contents) => {
    contents.on("new-window", (event, navigationUrl) => {
        event.preventDefault();

        // check if the user wants to open the dev-tools
        if (navigationUrl.split(":")[0] !== "chrome-devtools") {
            // ask the operating system to open the url in the default browser
            electron.shell.openExternalSync(navigationUrl);
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
            contextIsolation: true
        }
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
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
