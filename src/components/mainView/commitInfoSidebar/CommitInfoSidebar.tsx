import React from "react";

import "./CommitInfoSidebar.css";
import CommitInfo from "./commitInfo/CommitInfo";
import FileList from "./FileList";

class CommitInfoSidebar extends React.Component {
    render() {
        return (
            <div className="commit-info-sidebar">
                <CommitInfo
                    commitAuthor="Dominik Hintersdorf"
                    commitMessage="Place holder commit message"
                    authorDate="12/12/19 @ 12:35"
                    commitHash="9d86083"
                    filesChanged="4"
                />
                <FileList />
            </div>
        );
    }
}

export default CommitInfoSidebar;
