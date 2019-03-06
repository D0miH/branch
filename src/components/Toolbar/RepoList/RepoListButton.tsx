import React from "react";
import "./RepoListButton.css";

type Props = {
    repoName: String;
};

class RepoListButton extends React.Component<Props> {
    openRepoList() {
        console.log("Repo list button was clicked");
    }

    render() {
        return (
            <div className="RepoListButton" onClick={() => this.openRepoList()}>
                <span>{this.props.repoName}</span>
            </div>
        );
    }
}

export default RepoListButton;
