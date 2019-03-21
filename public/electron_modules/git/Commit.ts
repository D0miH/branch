export default class Commit {
    hash: string;
    author: string;
    relativeAuthorDate: string;
    commitTitle: string;

    constructor(hash: string, author: string, relativeAuthorDate: string, commitTitle: string) {
        this.hash = hash;
        this.author = author;
        this.relativeAuthorDate = relativeAuthorDate;
        this.commitTitle = commitTitle;
    }
}
