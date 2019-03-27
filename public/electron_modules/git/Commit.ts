export default class Commit {
    hash: string;
    author: string;
    commitDate: string;
    commitTime: string;
    commitMessage: string;

    constructor(hash: string, author: string, commitDate: string, commitTime: string, commitMessage: string) {
        this.hash = hash;
        this.author = author;
        this.commitDate = commitDate;
        this.commitTime = commitTime;
        this.commitMessage = commitMessage;
    }
}
