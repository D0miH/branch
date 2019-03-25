import React from "react";
import { observer, inject } from "mobx-react";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import { GitBranch, Inbox } from "@githubprimer/octicons-react";
import RepoListDropDown from "./RepoListDropDown/RepoListDropDown";
import ToolbarButton from "./ToolbarButton";
import Overlay from "./RepoListDropDown/Overlay";
import RepoList from "./RepoListDropDown/RepoList/RepoList";
import { RepositoryStore } from "../../stores/Git";

import "./Toolbar.css";

interface ExternalProps {}

interface InjectedProps extends ExternalProps {
    repoStore: RepositoryStore;
}

@inject(({ stores }) => ({
    repoStore: stores.repoStore
}))
@observer
class Toolbar extends React.Component<ExternalProps> {
    get injected() {
        return this.props as InjectedProps;
    }

    pull = () => {
        this.injected.repoStore.pullRepository();
    };

    push = () => {
        console.log("Push was clicked");
    };

    branch = () => {
        console.log("Branch was clicked");
    };

    stash = () => {
        console.log("Stash was clicked");
    };

    render() {
        const displayedReponame =
            this.injected.repoStore.currentRepoName === ""
                ? "Open Repository"
                : this.injected.repoStore.currentRepoName;

        return (
            <div className="toolbar">
                <div className="toolbar-content">
                    <RepoListDropDown repoName={displayedReponame} />
                    <div className="tools">
                        <ToolbarButton onClick={this.push} label="Push" icon={ArrowUpward} />
                        <ToolbarButton onClick={this.pull} label="Pull" icon={ArrowDownward} />
                        <ToolbarButton onClick={this.branch} label="Branch" icon={GitBranch} />
                        <ToolbarButton onClick={this.stash} label="Stash" icon={Inbox} />
                    </div>
                    <div className="misc" />
                </div>
                <RepoList />
                <Overlay />
            </div>
        );
    }
}

export default Toolbar;
