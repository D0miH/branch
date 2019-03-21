export { default as BranchStore } from "./BranchStore";
export { default as RepositoryStore } from "./RepositoryStore";

export enum GitErrorCode {
    UnknownError = 1,
    GitNotFound = 2,
    NoValidPathGiven = 3,
    LocalChangesPreventCheckout = 4
}
