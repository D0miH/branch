import React from "react";

import AdditionalInfo from "./AdditionalInfo";
import AuthorInfo from "./AuthorInfo";

import "./CommitInfo.css";

interface IProps {
    commitMessage: string;
    commitAuthor: string;
    authorDate: string;
    filesChanged: string;
    commitHash: string;
}

class CommitInfo extends React.Component<IProps> {
    render() {
        return (
            <div className="commit-info">
                <div className="commit-message">
                    <span>{this.props.commitMessage}</span>
                </div>
                <AuthorInfo commitAuthor={this.props.commitAuthor} authorDate={this.props.authorDate} />
                <AdditionalInfo filesChanged={this.props.filesChanged} commitHash={this.props.commitHash} />
            </div>
        );
    }
}

export default CommitInfo;
