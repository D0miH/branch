import { GitProcess } from "dugite";
import { ipcMain, IpcMessageEvent } from "electron";
import { promiseIpcMain } from "promisify-electron-ipc";
import Branch from "./Branch";
import Commit from "./Commit";
import { ErrorCode, ErrorMessages, ReturnObject } from "./ReturnObject";

export default class Repository {
    pathToRepo: string | null = null;

    // other git instances
    branch: Branch;

    constructor() {
        addIpcListener(this);

        // instantiate other git instances
        this.branch = new Branch(this);
    }

    /**
     * Opens the repository at the given path and returns the name of the repository.
     * @param repoPath The path to the repository.
     * @returns The name of the repository.
     */
    openRepo(repoPath: string) {
        this.pathToRepo = repoPath;

        return this.getRepoName();
    }

    /**
     * Gets the name of the repository. If there was no repository found the function returns null.
     */
    getRepoName() {
        if (this.pathToRepo === null) {
            return Promise.resolve(new ReturnObject("", ErrorCode.NoValidPathGiven));
        }

        return GitProcess.exec(["config", "--local", "--get", "remote.origin.url"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                // tslint:disable-next-line: no-console
                console.log(GitProcess.parseError(result.stderr));

                // if there was no git repo found reset the path to null
                if (result.stderr === "fatal: --local can only be used inside a git repository\n") {
                    this.pathToRepo = null;
                    return new ReturnObject("", ErrorCode.GitNotFound);
                }

                return new ReturnObject("", ErrorCode.UnknownError);
            }

            const url: string[] = result.stdout.split("/");

            // get the last *.git element and remove the .git
            const resultValue = url[url.length - 1].split(".")[0];
            return new ReturnObject(resultValue);
        });
    }

    /**
     * Returns all the local branches of the repository. If an error occurred the function returns null.
     * @param event The given event in which return value is set.
     */
    getLocalBranches() {
        if (this.pathToRepo === null) {
            return Promise.resolve(new ReturnObject("", ErrorCode.NoValidPathGiven));
        }

        return GitProcess.exec(["branch"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                // tslint:disable-next-line: no-console
                console.log(GitProcess.parseError(result.stderr));
                return new ReturnObject("", ErrorCode.UnknownError);
            }

            // parse the result by removeing the asterix and then the all spaces
            const parsedResult = result.stdout
                .replace("*", "")
                .replace(/ /g, "")
                .split("\n");
            // remove the last since this will be an empty string
            parsedResult.splice(-1, 1);
            return new ReturnObject(parsedResult);
        });
    }

    /**
     * Returns all the remote branches of the repository. If an error occurred the function returns null.
     * @param event The given event in which return value is set.
     */
    getRemoteBranches() {
        if (this.pathToRepo === null) {
            return Promise.resolve(new ReturnObject("", ErrorCode.NoValidPathGiven));
        }

        return GitProcess.exec(["branch", "-r"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                // tslint:disable-next-line: no-console
                console.log(GitProcess.parseError(result.stderr));
                return new ReturnObject("", ErrorCode.UnknownError);
            }

            // parse the result and remove the last since this will be an empty string
            const parsedResult = result.stdout.replace(/ /g, "").split("\n");
            parsedResult.splice(-1, 1);
            // remove the first element since this is the HEAD
            return new ReturnObject(parsedResult.slice(1));
        });
    }

    /**
     * Returns all tags of the repository. If an error occurred or there were no tags found, the function returns null.
     * @param event The given event in which the return value is set.
     */
    getTags() {
        if (this.pathToRepo === null) {
            return Promise.resolve(new ReturnObject("", ErrorCode.NoValidPathGiven));
        }

        return GitProcess.exec(["tag"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                // tslint:disable-next-line: no-console
                console.log(GitProcess.parseError(result.stderr));
                return new ReturnObject("", ErrorCode.UnknownError);
            } else if (result.stdout === "") {
                // if no tags were found just return an empty string array
                const returnValue: string[] = [];
                return new ReturnObject(returnValue);
            }

            // parse the result and return all but the last line (because it is empty)
            const lines = result.stdout.split("\n");
            lines.splice(-1, 1);
            return new ReturnObject(lines);
        });
    }

    /**
     * Returns all stashes of the repository.
     * @param event The given event in which the return value is set.
     */
    getStashes() {
        if (this.pathToRepo === null) {
            return Promise.resolve(new ReturnObject("", ErrorCode.NoValidPathGiven));
        }

        return GitProcess.exec(["stash", "list"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                // tslint:disable-next-line: no-console
                console.log(GitProcess.parseError(result.stderr));
                return new ReturnObject("", ErrorCode.UnknownError);
            } else if (result.stdout === "") {
                // if no stashes were found just return an empty array
                const returnValue: string[] = [];
                return new ReturnObject(returnValue);
            }

            // parse the result
            const lines = result.stdout.split("\n");
            lines.forEach((line: string, index: number) => {
                // only keep the part after the colon
                lines[index] = line.split("}: ")[1];
            });
            lines.splice(-1, 1);

            return new ReturnObject(lines);
        });
    }

    /**
     * Returns the commit history for a given branch.
     * @param branchName The name of the branch from which to retrieve the commit history.
     * @param event The given event in which the return value is set.
     */
    getCommitHistory(branchName: string) {
        if (this.pathToRepo === null) {
            return Promise.resolve(new ReturnObject("", ErrorCode.NoValidPathGiven));
        }

        return GitProcess.exec(
            ["log", branchName, "--pretty=format:%h-%an-%cd-%s", "--date=format:%d/%m/%Y@%H:%M"],
            this.pathToRepo
        ).then(result => {
            if (result.exitCode !== 0) {
                // tslint:disable-next-line: no-console
                console.log(GitProcess.parseError(result.stderr));
                return new ReturnObject("", ErrorCode.UnknownError);
            }

            const lines = result.stdout.split("\n");

            // iterate the lines and extract the information
            const commitObjects: Commit[] = [];

            lines.forEach(line => {
                const content = line.split("-");

                const hash = content[0];
                const author = content[1];

                const commitDate = content[2].split("@")[0];
                const commitTime = content[2].split("@")[1];

                // all other array elements are the commit title.
                // If there are more than one more element readd the hyphon which was split.
                let commitMessage = content[3];
                if (content.length > 4) {
                    for (let i = 4; i < content.length; i++) {
                        commitMessage += "-" + content[i];
                    }
                }

                commitObjects.push(new Commit(hash, author, commitDate, commitTime, commitMessage));
            });

            return new ReturnObject(commitObjects);
        });
    }

    /**
     * Pulls all branches of the repository. Returns the output of the git pull command.
     * @param event The given event in which the return value is set.
     */
    pullAll(): Promise<any> {
        if (this.pathToRepo === null) {
            return Promise.resolve(new ReturnObject("", ErrorCode.NoValidPathGiven));
        }

        return GitProcess.exec(["pull", "--all"], this.pathToRepo).then(result => {
            if (result.exitCode !== 0) {
                if (result.stderr.includes(ErrorMessages.localChangesWouldBeOverwritten)) {
                    return Promise.resolve(new ReturnObject(result.stderr, ErrorCode.LocalChangesPreventPull));
                }

                // tslint:disable-next-line: no-console
                console.log(GitProcess.parseError(result.stderr));
                return Promise.resolve(new ReturnObject(result.stderr, ErrorCode.UnknownError));
            }

            return Promise.resolve(new ReturnObject(result.stdout));
        });
    }
}

function addIpcListener(repo: Repository) {
    promiseIpcMain.on("open-repo", (repoPath: string) => repo.openRepo(repoPath));

    promiseIpcMain.on("get-local-branches", () => repo.getLocalBranches());

    promiseIpcMain.on("get-remote-branches", () => repo.getRemoteBranches());

    promiseIpcMain.on("get-tags", () => repo.getTags());

    promiseIpcMain.on("get-stashes", () => repo.getStashes());

    promiseIpcMain.on("get-commit-history", (branchName: string) => repo.getCommitHistory(branchName));

    promiseIpcMain.on("pull-all", () => repo.pullAll());
}
