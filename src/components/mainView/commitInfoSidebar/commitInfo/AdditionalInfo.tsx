import React from "react";
import Octicon, { Diff, GitCommit } from "@githubprimer/octicons-react";

import "./AdditionalInfo.css";

type Props = {
    filesChanged: string;
    commitHash: string;
};

class AdditionalInfo extends React.Component<Props> {
    render() {
        return (
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
        );
    }
}

export default AdditionalInfo;
