import React from "react";
import { observer } from "mobx-react";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import { GitBranch, Inbox } from "@githubprimer/octicons-react";
import RepoListDropDown from "./RepoListDropDown/RepoListDropDown";
import ToolbarButton from "./ToolbarButton";
import Overlay from "./RepoListDropDown/Overlay";
import RepoList from "./RepoListDropDown/RepoList/RepoList";
import { IToolbarStore } from "../../stores/stores";

import "./Toolbar.css";

type Props = {
    toolbarStore: IToolbarStore;
};

@observer
class Toolbar extends React.Component<Props> {
    render() {
        return (
            <div className="Toolbar">
                <div className="ToolbarContent">
                    <RepoListDropDown
                        repoName="Open Repository"
                        toolbarStore={this.props.toolbarStore}
                    />
                    <div className="Tools">
                        <ToolbarButton label="Push" icon={ArrowUpward} />
                        <ToolbarButton label="Pull" icon={ArrowDownward} />
                        <ToolbarButton label="Branch" icon={GitBranch} />
                        <ToolbarButton label="Stash" icon={Inbox} />
                    </div>
                </div>
                <RepoList toolbarStore={this.props.toolbarStore} />
                <Overlay toolbarStore={this.props.toolbarStore} />
            </div>
        );
    }
}

export default Toolbar;
