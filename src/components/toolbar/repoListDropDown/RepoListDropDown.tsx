import { inject, observer } from "mobx-react";
import React from "react";

import ToolbarStore from "../../../stores/ToolbarStore";

import "./RepoListDropDown.css";

interface IExternalProps {
    repoName: string;
}

interface IInjectedProps extends IExternalProps {
    toolbarStore: ToolbarStore;
}

@inject(({ stores }) => ({
    toolbarStore: stores.toolbarStore
}))
@observer
class RepoListDropDown extends React.Component<IExternalProps> {
    get injected() {
        return this.props as IInjectedProps;
    }

    openRepoList() {
        this.injected.toolbarStore.repoListVisible = !this.injected.toolbarStore.repoListVisible;
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
