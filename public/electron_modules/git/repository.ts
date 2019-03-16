import { Repository, Reference } from "nodegit";
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
    async getRepoName(repo: Repository) {
        if (this.currentOpenedRepo === null) {
            event.returnValue = null;
        }

        let remoteUrl = await this.currentOpenedRepo
            .getRemote("origin")
            .then(remote => remote.url());

        let url: string[] = remoteUrl.split("/");

        // get the last *.git element and remove the .git
        return url[url.length - 1].split(".")[0];
    }

    async getAllReferences(): Promise<Reference[]> {
        return this.currentOpenedRepo.getReferences(Reference.TYPE.LISTALL);
    }

    /**
     * Returns all the local branches as a string array.
     * @param event The given IpcMessageEvent.
     */
    getLocalBranches(event: IpcMessageEvent) {
        this.getAllReferences().then(refs => {
            let branches = [];

            refs.forEach(ref => {
                if (ref.isBranch() && !ref.isRemote()) {
                    branches.push(ref.name());
                }
            });

            event.returnValue = branches;
        });
    }

    /**
     * Returns all the remote branches as a string array.
     * @param event The given IpcMessageEvent.
     */
    getRemoteBranches(event: IpcMessageEvent) {
        this.getAllReferences().then(refs => {
            let branches = [];

            refs.forEach(ref => {
                if (ref.isBranch()) {
                    branches.push(ref.name());
                }
            });

            event.returnValue = branches;
        });
    }

    /**
     * Returns all the tags (local and remote) as a string array.
     * @param event The given IpcMessageEvent.
     */
    getTags(event: IpcMessageEvent) {
        this.getAllReferences().then(refs => {
            let tags = [];

            refs.forEach(ref => {
                if (ref.isTag()) {
                    tags.push(ref.name());
                }
            });

            event.returnValue = tags;
        });
    }
}

function addIpcListener() {
    ipcMain.on("open-repo", (event: IpcMessageEvent, repoPath: string) =>
        this.openRepo(event, repoPath)
    );

    ipcMain.on("get-local-branches", (event: IpcMessageEvent) =>
        this.getLocalBranches(event)
    );

    ipcMain.on("get-remote-branches", (event: IpcMessageEvent) =>
        this.getRemoteBranches(event)
    );

    ipcMain.on("get-tags", (event: IpcMessageEvent) => this.getTags(event));
}
