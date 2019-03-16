import { Repository } from "nodegit";
import { ipcMain, IpcMessageEvent } from "electron";

export default class Repo {
    currentOpenedRepo: Repository;

    constructor() {
        let addListenerFunc = addIpcListener.bind(this);
        addListenerFunc();
    }

    /**
     * Opens the repository at the given path and returns the name of the repository.
     * @param repoPath The path to the repository.
     * @returns The name of the repository.
     */
    openRepo(event: IpcMessageEvent, repoPath: string): void {
        Repository.open(repoPath)
            .then(repo => (this.currentOpenedRepo = repo))
            .then(repo => this.getRepoName(repo))
            .then(repoName => (event.returnValue = repoName))
            .catch(err => console.log(err));
    }

    /**
     * Gets the name of the repository.
     * @param event The given IpcMessageEvent.
     */
    getRepoName(repo: Repository) {
        if (this.currentOpenedRepo === null) {
            event.returnValue = null;
        }

        let path: string[] = this.currentOpenedRepo.path().split("/");
        return path[path.length - 3];
    }
}

function addIpcListener() {
    ipcMain.on("open-repo", (event: IpcMessageEvent, repoPath: string) =>
        this.openRepo(event, repoPath)
    );
}
