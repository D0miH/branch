import React from "react";
import Commit from "./Commit";
import { inject, observer } from "mobx-react";

import { RepositoryStore } from "../../../stores";

import "./CommitList.css";

interface InjectedProps {
    repoStore: RepositoryStore;
}

@inject(({ stores }) => ({
    repoStore: stores.repoStore
}))
@observer
class CommitList extends React.Component {
    get injected() {
        return this.props as InjectedProps;
    }

    renderCommitList() {
        return this.injected.repoStore.commitHistory.map((commit, index) => {
            return <Commit title={commit.commitTitle} key={commit.hash} />;
        });
    }

    render() {
        return <div className="commit-list">{this.renderCommitList()}</div>;
    }
}

export default CommitList;
