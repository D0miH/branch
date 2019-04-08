export interface IGitRepoListItem {
    repoName: string;
    repoPath: string;
}

export interface IGitReturnObject {
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

export interface IGitCommit {
    hash: string;
    author: string;
    commitDate: string;
    commitTime: string;
    commitMessage: string;
}
