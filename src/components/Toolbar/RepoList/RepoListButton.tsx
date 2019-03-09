import React from "react";
import { observer } from "mobx-react";
import { IToolbarStore } from "../../../stores/stores";
import "./RepoListButton.css";

type Props = {
    repoName: String;
    toolbarStore: IToolbarStore;
};

@observer
class RepoListButton extends React.Component<Props> {
    openRepoList() {
        this.props.toolbarStore.repoListVisible = !this.props.toolbarStore
            .repoListVisible;
        console.log("Repo list button was clicked");
    }

    render() {
        return (
            <div
                className="RepoListDropDown"
                onClick={() => this.openRepoList()}
            >
                <div className="RepoListButton">
                    <span>{this.props.repoName}</span>
                </div>
            </div>
        );
    }
}

export default RepoListButton;
