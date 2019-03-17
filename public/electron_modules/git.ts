import { BrowserWindow } from "electron";
import Repository from "./git/repository";

var browserWindow: BrowserWindow;

let repo: Repository;

export default function initGit(mainWindow: BrowserWindow) {
    browserWindow = mainWindow;

    repo = new Repository();
}
