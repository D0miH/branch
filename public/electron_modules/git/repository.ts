import { GitProcess } from "dugite";
import { ipcMain, IpcMessageEvent } from "electron";

export default class Repository {
    pathToRepo: string = null;

    constructor() {
        let addListenerFunc = addIpcListener.bind(this);
        addListenerFunc();
    }

    /**
     * Opens the repository at the given path and returns the name of the repository.
     * @param repoPath The path to the repository.
     * @returns The name of the repository.
     */
    async openRepo(event: IpcMessageEvent, repoPath: string): Promise<void> {
        this.pathToRepo = repoPath;

        event.returnValue = await this.getRepoName();
    }

    /**
     * Gets the name of the repository.
     */
    async getRepoName(): Promise<string> {
        if (this.pathToRepo === null) {
            event.returnValue = null;
        }

        return GitProcess.exec(
            ["config", "--get", "remote.origin.url"],
            this.pathToRepo
        ).then(result => {
            if (result.exitCode !== 0) {
                console.log(GitProcess.parseError(result.stderr));
            }

            let url: string[] = result.stdout.split("/");

            // get the last *.git element and remove the .git
            return url[url.length - 1].split(".")[0];
        });
    }
}

function addIpcListener() {
    ipcMain.on("open-repo", (event: IpcMessageEvent, repoPath: string) =>
        this.openRepo(event, repoPath)
    );
}
