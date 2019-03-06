import React from "react";
import RepoListButton from "./RepoList/RepoListButton";
import "./Toolbar.css";

class Toolbar extends React.Component {
    render() {
        return (
            <div className="Toolbar">
                <RepoListButton repoName="Open Repository" />
            </div>
        );
    }
}

export default Toolbar;
