import React from "react";
import Identicon from "identicon.js";
import jsSHA from "jssha";
import Octicon, { Diff, GitCommit } from "@githubprimer/octicons-react";

import "./CommitInfo.css";

type Props = {
    commitMessage: string;
    commitAuthor: string;
    relativeAuthorDate: string;
    filesChanged: number;
    commitHash: string;
};

class CommitInfo extends React.Component<Props> {
    generateAvatar(): string {
        let hashObject = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
        hashObject.update(this.props.commitAuthor + 0, 1);
        let hash = hashObject.getHash("HEX");
        let imgData = new Identicon(hash, 30).toString();
        return "data:/image/png;base64," + imgData;
    }

    render() {
        return (
            <div className="commit-info">
                <div className="commit-message">
                    <span>{this.props.commitMessage}</span>
                </div>
                <div className="author-section">
                    <img className="commit-avatar" src={this.generateAvatar()} />
                    <div className="author-info">
                        <span>{this.props.commitAuthor}</span>
                        <span>{"authored " + this.props.relativeAuthorDate}</span>
                    </div>
                </div>
                <div className="additional-info">
                    <div className="changed-files-section">
                        <Octicon icon={Diff} />
                        <span>{this.props.filesChanged + " files changed"}</span>
                    </div>
                    <div className="commit-hash-section">
                        <Octicon icon={GitCommit} />
                        <span>{this.props.commitHash}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommitInfo;
