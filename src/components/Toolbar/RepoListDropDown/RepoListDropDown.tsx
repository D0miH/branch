import React from "react";
import { observer, inject } from "mobx-react";

import ToolbarStore from "../../../stores/ToolbarStore";

import "./RepoListDropDown.css";

interface ExternalProps {
    repoName: String;
}

interface InjectedProps extends ExternalProps {
    toolbarStore: ToolbarStore;
}

@inject(({ stores }) => ({
    toolbarStore: stores.toolbarStore
}))
@observer
class RepoListDropDown extends React.Component<ExternalProps> {
    get injected() {
        return this.props as InjectedProps;
    }

    openRepoList() {
        this.injected.toolbarStore.repoListVisible = !this.injected.toolbarStore.repoListVisible;
        console.log("Repo list button was clicked");
    }

    render() {
        return (
            <div className="repo-list-drop-down" onClick={() => this.openRepoList()}>
                <div className="repo-list-button">
                    <span>{this.props.repoName}</span>
                </div>
            </div>
        );
    }
}

export default RepoListDropDown;
