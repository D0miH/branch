import { inject, observer } from "mobx-react";
import React from "react";

import { RepositoryStore } from "../../../../stores/git";
import ToolbarStore from "../../../../stores/ToolbarStore";
import AddRepoButton from "./AddRepoButton";
import RepoListElement from "./RepoListElement";

import "./RepoList.css";

interface IExternalProps {}

interface IInjectedProps extends IExternalProps {
    toolbarStore: ToolbarStore;
    repoStore: RepositoryStore;
}

@inject(({ stores }) => ({
    repoStore: stores.repoStore,
    toolbarStore: stores.toolbarStore
}))
@observer
class RepoList extends React.Component<IExternalProps> {
    get injected() {
        return this.props as IInjectedProps;
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
