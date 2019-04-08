import { observable } from "mobx";
import { IGitCommit } from "../typings/git-types";

export default class CommitSidebarStore {
    @observable selectedCommit: IGitCommit = {
        author: "",
        commitDate: "",
        commitMessage: "",
        commitTime: "",
        hash: ""
    };
}
