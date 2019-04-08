import { GitBranch, Inbox } from "@githubprimer/octicons-react";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { inject, observer } from "mobx-react";
import React from "react";

import { RepositoryStore } from "../../stores/git";
import Overlay from "./repoListDropDown/Overlay";
import RepoList from "./repoListDropDown/repoList/RepoList";
import RepoListDropDown from "./repoListDropDown/RepoListDropDown";
import ToolbarButton from "./ToolbarButton";

import "./Toolbar.css";

interface IExternalProps {}

interface IInjectedProps extends IExternalProps {
    repoStore: RepositoryStore;
}

@inject(({ stores }) => ({
    repoStore: stores.repoStore
}))
@observer
class Toolbar extends React.Component<IExternalProps> {
    get injected() {
        return this.props as IInjectedProps;
    }

    pull = () => {
        this.injected.repoStore.pullRepository();
    };

    push = () => {
        console.error("Button has no function yet");
    };

    branch = () => {
        console.error("Button has no function yet");
    };

    stash = () => {
        console.error("Button has no function yet");
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
