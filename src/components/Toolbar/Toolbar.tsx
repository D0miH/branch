import React from "react";
import { observer } from "mobx-react";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import { GitBranch, Inbox } from "@githubprimer/octicons-react";
import RepoListDropDown from "./RepoListDropDown/RepoListDropDown";
import ToolbarButton from "./ToolbarButton";
import Overlay from "./RepoListDropDown/Overlay";
import RepoList from "./RepoListDropDown/RepoList/RepoList";

import "./Toolbar.css";

class Toolbar extends React.Component {
    render() {
        return (
            <div className="toolbar">
                <div className="toolbar-content">
                    <RepoListDropDown repoName="Open Repository" />
                    <div className="tools">
                        <ToolbarButton label="Push" icon={ArrowUpward} />
                        <ToolbarButton label="Pull" icon={ArrowDownward} />
                        <ToolbarButton label="Branch" icon={GitBranch} />
                        <ToolbarButton label="Stash" icon={Inbox} />
                    </div>
                </div>
                <RepoList />
                <Overlay />
            </div>
        );
    }
}

export default Toolbar;
