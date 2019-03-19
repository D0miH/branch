import React from "react";
import { observer, inject } from "mobx-react";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import { GitBranch, Inbox } from "@githubprimer/octicons-react";
import RepoListDropDown from "./RepoListDropDown/RepoListDropDown";
import ToolbarButton from "./ToolbarButton";
import Overlay from "./RepoListDropDown/Overlay";
import RepoList from "./RepoListDropDown/RepoList/RepoList";

import "./Toolbar.css";
import { RepositoryStore } from "../../stores";

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
