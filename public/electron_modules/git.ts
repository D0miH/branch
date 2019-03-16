import { BrowserWindow } from "electron";
import Repo from "./git/repository";

var browserWindow: BrowserWindow;

let repo: Repo;

export default function initGit(mainWindow: BrowserWindow) {
    browserWindow = mainWindow;

    repo = new Repo();
}
