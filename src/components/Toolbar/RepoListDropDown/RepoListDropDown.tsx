import React from "react";
import { observer } from "mobx-react";
import { IToolbarStore } from "../../../stores/stores";
import "./RepoListDropDown.css";

type Props = {
    repoName: String;
    toolbarStore: IToolbarStore;
};

@observer
class RepoListDropDown extends React.Component<Props> {
    openRepoList() {
        this.props.toolbarStore.repoListVisible = !this.props.toolbarStore
            .repoListVisible;
        console.log("Repo list button was clicked");
    }

    render() {
        return (
            <div
                className="repo-list-drop-down"
                onClick={() => this.openRepoList()}
            >
                <div className="repo-list-button">
                    <span>{this.props.repoName}</span>
                </div>
            </div>
        );
    }
}

export default RepoListDropDown;
