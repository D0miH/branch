import { BrowserWindow } from "electron";
import Repository from "./git/Repository";

let browserWindow: BrowserWindow;

let repo: Repository;

export default function initGit(mainWindow: BrowserWindow) {
    browserWindow = mainWindow;

    repo = new Repository();
}
