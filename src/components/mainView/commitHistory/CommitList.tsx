import React from "react";
import Commit from "./Commit";
import { inject, observer } from "mobx-react";

import { RepositoryStore } from "../../../stores/git";
import { GitCommit } from "../../../typings/git-types";
import { CommitSidebarStore } from "../../../stores";

import "./CommitList.css";

interface InjectedProps {
    repoStore: RepositoryStore;
    commitSidebarStore: CommitSidebarStore;
}

@inject(({ stores }) => ({
    repoStore: stores.repoStore,
    commitSidebarStore: stores.commitSidebarStore
}))
@observer
class CommitList extends React.Component {
    get injected() {
        return this.props as InjectedProps;
    }

    onCommitClick(commit: GitCommit) {
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
