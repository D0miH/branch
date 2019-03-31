import React from "react";
import { observer, inject } from "mobx-react";
import AddRepoButton from "./AddRepoButton";

import ToolbarStore from "../../../../stores/ToolbarStore";

import "./RepoList.css";
import RepoListElement from "./RepoListElement";
import { RepositoryStore } from "../../../../stores/git";

interface ExternalProps {}

interface InjectedProps extends ExternalProps {
    toolbarStore: ToolbarStore;
    repoStore: RepositoryStore;
}

@inject(({ stores }) => ({
    toolbarStore: stores.toolbarStore,
    repoStore: stores.repoStore
}))
@observer
class RepoList extends React.Component<ExternalProps> {
    get injected() {
        return this.props as InjectedProps;
    }

    onListElementClick(repoName: string, repoPath: string) {
        this.injected.repoStore.openRepo(repoPath);
        this.injected.toolbarStore.repoListVisible = false;
    }

    renderRepoList() {
        return this.injected.toolbarStore.repoList.map((listEntry, index) => {
            return (
                <RepoListElement
                    label={listEntry.repoName}
                    onClick={() => this.onListElementClick(listEntry.repoName, listEntry.repoPath)}
                    key={listEntry.repoName + index}
                />
            );
        });
    }

    render() {
        return (
            <div
                className="repository-list"
                style={{
                    display: this.injected.toolbarStore.repoListVisible ? "block" : "none"
                }}
            >
                <AddRepoButton />
                {this.renderRepoList()}
            </div>
        );
    }
}

export default RepoList;
