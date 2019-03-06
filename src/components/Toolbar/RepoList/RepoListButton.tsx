import React from "react";
import "./RepoListButton.css";
import Overlay from "./Overlay";

type Props = {
    repoName: String;
};

type State = {
    listIsCollapsed: boolean;
};

class RepoListButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { listIsCollapsed: true };
    }

    openRepoList() {
        this.setState({ listIsCollapsed: !this.state.listIsCollapsed });
        console.log("Repo list button was clicked");
    }

    render() {
        return (
            <div
                className="RepoListButton"
                style={{ zIndex: this.state.listIsCollapsed ? 1 : 3 }}
                onClick={() => this.openRepoList()}
            >
                <span>{this.props.repoName}</span>
                <Overlay overlayVisible={!this.state.listIsCollapsed} />
            </div>
        );
    }
}

export default RepoListButton;
