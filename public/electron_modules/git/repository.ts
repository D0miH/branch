import { GitProcess } from "dugite";
import { ipcMain, IpcMessageEvent } from "electron";
import { ReturnObject, ErrorCode } from "./ReturnObject";

export default class Repository {
    pathToRepo: string | null = null;

    constructor() {
        addIpcListener(this);
    }

    /**
     * Opens the repository at the given path and returns the name of the repository.
     * @param repoPath The path to the repository.
     * @returns The name of the repository.
     */
    async openRepo(event: IpcMessageEvent, repoPath: string): Promise<void> {
        this.pathToRepo = repoPath;

        this.getRepoName(event);
    }

    /**
     * Gets the name of the repository. If there was no repository found the function returns null.
     */
    async getRepoName(event: IpcMessageEvent) {
        if (this.pathToRepo === null) {
            event.returnValue = new ReturnObject("", ErrorCode.NoValidPathGiven);
            return;
        }

        GitProcess.exec(["config", "--get", "remote.origin.url"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                let err = GitProcess.parseError(result.stderr);
                console.log(err);

                // if there was no git repo found reset the path to null
                if (err === 28) {
                    this.pathToRepo = null;
                    event.returnValue = new ReturnObject("", ErrorCode.GitNotFound);
                }

                event.returnValue = new ReturnObject("", ErrorCode.UnknownError);
                return;
            }

            let url: string[] = result.stdout.split("/");

            // get the last *.git element and remove the .git
            let resultValue = url[url.length - 1].split(".")[0];
            event.returnValue = new ReturnObject(resultValue);
        });
    }

    /**
     * Returns all the local branches of the repository. If an error occurred the function returns null.
     * @param event The given event in which return value is set.
     */
    async getLocalBranches(event: IpcMessageEvent) {
        if (this.pathToRepo === null) {
            event.returnValue = new ReturnObject("", ErrorCode.NoValidPathGiven);
            return;
        }

        GitProcess.exec(["branch"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                console.log(GitProcess.parseError(result.stderr));
                event.returnValue = new ReturnObject("", ErrorCode.UnknownError);
                return;
            }

            // parse the result by removeing the asterix and then the all spaces
            let parsedResult = result.stdout
                .replace("*", "")
                .replace(/ /g, "")
                .split("\n");
            // remove the last since this will be an empty string
            parsedResult.splice(-1, 1);
            event.returnValue = new ReturnObject(parsedResult);
        });
    }

    /**
     * Returns all the remote branches of the repository. If an error occurred the function returns null.
     * @param event The given event in which return value is set.
     */
    async getRemoteBranches(event: IpcMessageEvent) {
        if (this.pathToRepo === null) {
            event.returnValue = new ReturnObject("", ErrorCode.NoValidPathGiven);
            return;
        }

        GitProcess.exec(["branch", "-r"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                console.log(GitProcess.parseError(result.stderr));
                event.returnValue = new ReturnObject("", ErrorCode.UnknownError);
                return;
            }

            // parse the result and remove the last since this will be an empty string
            let parsedResult = result.stdout.replace(/ /g, "").split("\n");
            parsedResult.splice(-1, 1);
            // remove the first element since this is the HEAD
            event.returnValue = new ReturnObject(parsedResult.slice(1));
        });
    }

    /**
     * Returns all tags of the repository. If an error occurred or there were no tags found, the function returns null.
     * @param event The given event in which the return value is set.
     */
    async getTags(event: IpcMessageEvent) {
        if (this.pathToRepo === null) {
            event.returnValue = new ReturnObject("", ErrorCode.NoValidPathGiven);
            return;
        }

        GitProcess.exec(["tag"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                console.log(GitProcess.parseError(result.stderr));
                event.returnValue = new ReturnObject("", ErrorCode.UnknownError);
                return;
            } else if (result.stdout === "") {
                // if no tags were found just return an empty string array
                let returnValue: string[] = [];
                event.returnValue = new ReturnObject(returnValue);
            }

            // parse the result and return all but the last line (because it is empty)
            let lines = result.stdout.split("\n");
            lines.splice(-1, 1);
            event.returnValue = new ReturnObject(lines);
        });
    }

    /**
     * Returns all stashes of the repository.
     * @param event The given event in which the return value is set.
     */
    async getStashes(event: IpcMessageEvent) {
        if (this.pathToRepo === null) {
            event.returnValue = new ReturnObject("", ErrorCode.NoValidPathGiven);
            return;
        }

        GitProcess.exec(["stash", "list"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                console.log(GitProcess.parseError(result.stderr));
                event.returnValue = new ReturnObject("", ErrorCode.UnknownError);
                return;
            } else if (result.stdout === "") {
                // if no stashes were found just return an empty array
                let returnValue: string[] = [];
                event.returnValue = new ReturnObject(returnValue);
                return;
            }

            // parse the result
            let lines = result.stdout.split("\n");
            lines.forEach((line: string, index: number) => {
                // only keep the part after the colon
                lines[index] = line.split("}: ")[1];
            });
            lines.splice(-1, 1);

            event.returnValue = new ReturnObject(lines);
        });
    }
}

function addIpcListener(repo: Repository) {
    ipcMain.on("open-repo", (event: IpcMessageEvent, repoPath: string) => repo.openRepo(event, repoPath));

    ipcMain.on("get-local-branches", (event: IpcMessageEvent) => repo.getLocalBranches(event));

    ipcMain.on("get-remote-branches", (event: IpcMessageEvent) => repo.getRemoteBranches(event));

    ipcMain.on("get-tags", (event: IpcMessageEvent) => repo.getTags(event));

    ipcMain.on("get-stashes", (event: IpcMessageEvent) => repo.getStashes(event));
}
