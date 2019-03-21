import { RepositoryStore, BranchStore } from "./Git";

export default class GitStore {
    repoStore: RepositoryStore = new RepositoryStore(this);
    branchStore: BranchStore = new BranchStore(this);
}
