export interface GitRepoListItem {
    repoName: string;
    repoPath: string;
}

export interface GitReturnObject {
    value: any;
    errorCode: GitErrorCode;
}

export enum GitErrorCode {
    UnknownError = 1,
    GitNotFound = 2,
    NoValidPathGiven = 3,
    LocalChangesPreventCheckout = 4,
    LocalChangesPreventPull = 5
}

export interface GitCommit {
    hash: string;
    author: string;
    commitDate: string;
    commitTime: string;
    commitMessage: string;
}
