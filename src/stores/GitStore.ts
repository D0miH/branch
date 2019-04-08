import { BranchStore, RepositoryStore } from "./git";

export default class GitStore {
    repoStore: RepositoryStore = new RepositoryStore(this);
    branchStore: BranchStore = new BranchStore(this);
}
