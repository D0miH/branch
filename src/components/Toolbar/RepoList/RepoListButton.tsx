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
                className="RepoListDropDown"
                onClick={() => this.openRepoList()}
                style={{ zIndex: 1 }}
            >
                <div className="RepoListButton">
                    <span>{this.props.repoName}</span>
                </div>
                <Overlay overlayVisible={!this.state.listIsCollapsed} />
            </div>
        );
    }
}

export default RepoListButton;
