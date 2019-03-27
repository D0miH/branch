import { observable } from "mobx";
import { GitCommit } from "../typings/git-types";

export default class CommitSidebarStore {
    @observable selectedCommit: GitCommit = { commitDate: "", commitMessage: "", commitTime: "", author: "", hash: "" };
}
