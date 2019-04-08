import { inject, observer } from "mobx-react";
import React from "react";

import { CommitSidebarStore } from "../../../stores";
import CommitInfo from "./commitInfo/CommitInfo";
import FileList from "./FileList";

import "./CommitInfoSidebar.css";

interface IExternalProps {}

interface IInjectedProps extends IExternalProps {
    commitSidebarStore: CommitSidebarStore;
}

@inject(({ stores }) => ({
    commitSidebarStore: stores.commitSidebarStore
}))
@observer
class CommitInfoSidebar extends React.Component<IExternalProps> {
    get injected() {
        return this.props as IInjectedProps;
    }

    render() {
        // if there is no info to display return null
        if (this.injected.commitSidebarStore.selectedCommit.author === "") {
            return null;
        }

        return (
            <div className="commit-info-sidebar">
                <CommitInfo
                    commitAuthor={this.injected.commitSidebarStore.selectedCommit.author}
                    commitMessage={this.injected.commitSidebarStore.selectedCommit.commitMessage}
                    authorDate={
                        this.injected.commitSidebarStore.selectedCommit.commitDate +
                        " @ " +
                        this.injected.commitSidebarStore.selectedCommit.commitTime
                    }
                    commitHash={this.injected.commitSidebarStore.selectedCommit.hash}
                    filesChanged={"TODO"}
                />
                <FileList />
            </div>
        );
    }
}

export default CommitInfoSidebar;
