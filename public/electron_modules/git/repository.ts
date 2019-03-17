import { GitProcess } from "dugite";
import { ipcMain, IpcMessageEvent } from "electron";
import { createInterface } from "readline";

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

    /**
     * Returns all the local branches of the repository.
     * @param event The given event in which return value is set.
     */
    async getLocalBranches(event: IpcMessageEvent) {
        if (this.pathToRepo === null) {
            event.returnValue = null;
        }

        GitProcess.exec(["branch"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                console.log(GitProcess.parseError(result.stderr));
            }

            // parse the result by removeing the asterix and then the all spaces
            let parsedResult = result.stdout
                .replace("*", "")
                .replace(/ /g, "")
                .split("\n");
            // remove the last since this will be an empty string
            parsedResult.splice(-1, 1);
            event.returnValue = parsedResult;
        });
    }

    /**
     * Returns all the remote branches of the repository.
     * @param event The given event in which return value is set.
     */
    async getRemoteBranches(event: IpcMessageEvent) {
        if (this.pathToRepo === null) {
            event.returnValue = null;
        }

        GitProcess.exec(["branch", "-r"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                console.log(GitProcess.parseError(result.stderr));
            }

            // parse the result and remove the last since this will be an empty string
            let parsedResult = result.stdout.replace(/ /g, "").split("\n");
            parsedResult.splice(-1, 1);
            // remove the first element since this is the HEAD
            event.returnValue = parsedResult.slice(1);
        });
    }

    /**
     * Returns all tags of the repository.
     * @param event The given event in which the return value is set.
     */
    async getTags(event: IpcMessageEvent) {
        if (this.pathToRepo === null) {
            event.returnValue = null;
        }

        GitProcess.exec(["tag"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                console.log(GitProcess.parseError(result.stderr));
            } else if (result.stdout === "") {
                event.returnValue = null;
            }

            // parse the result and return all but the last line (because it is empty)
            let lines = result.stdout.split("\n");
            lines.splice(-1, 1);
            event.returnValue = lines;
        });
    }

    /**
     * Returns all stashes of the repository.
     * @param event The given event in which the return value is set.
     */
    async getStashes(event: IpcMessageEvent) {
        if (this.pathToRepo === null) {
            event.returnValue = null;
        }

        GitProcess.exec(["stash", "list"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                console.log(GitProcess.parseError(result.stderr));
            } else if (result.stdout === "") {
                event.returnValue = null;
            }

            // parse the result
            let lines = result.stdout.split("\n");
            lines.forEach((line: string, index: number) => {
                // only keep the part after the colon
                lines[index] = line.split("}: ")[1];
            });
            lines.splice(-1, 1);

            event.returnValue = lines;
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

    ipcMain.on("get-stashes", (event: IpcMessageEvent) =>
        this.getStashes(event)
    );
}
