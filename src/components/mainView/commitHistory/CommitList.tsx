import { inject, observer } from "mobx-react";
import React from "react";

import { CommitSidebarStore } from "../../../stores";
import { RepositoryStore } from "../../../stores/git";
import { IGitCommit } from "../../../typings/git-types";
import Commit from "./Commit";

import "./CommitList.css";

interface IInjectedProps {
    repoStore: RepositoryStore;
    commitSidebarStore: CommitSidebarStore;
}

@inject(({ stores }) => ({
    commitSidebarStore: stores.commitSidebarStore,
    repoStore: stores.repoStore
}))
@observer
class CommitList extends React.Component {
    get injected() {
        return this.props as IInjectedProps;
    }

    onCommitClick(commit: IGitCommit) {
        this.injected.commitSidebarStore.selectedCommit = commit;
    }

    renderCommitList() {
        return this.injected.repoStore.commitHistory.map(commit => {
            return <Commit title={commit.commitMessage} key={commit.hash} onClick={() => this.onCommitClick(commit)} />;
        });
    }

    render() {
        return <div className="commit-list">{this.renderCommitList()}</div>;
    }
}

export default CommitList;
