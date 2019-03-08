import React from "react";
import RepoListButton from "./RepoList/RepoListButton";
import PushButton from "./ToolButtons/PushButton";
import "./Toolbar.css";

class Toolbar extends React.Component {
    render() {
        return (
            <div className="Toolbar">
                <RepoListButton repoName="Open Repository" />
                <div className="Tools">
                    <PushButton />
                </div>
            </div>
        );
    }
}

export default Toolbar;
