import { GitBranch, Inbox, Tag } from "@githubprimer/octicons-react";
import { CloudOutlined } from "@material-ui/icons";
import { inject, observer } from "mobx-react";
import React from "react";
import { BranchStore, RepositoryStore } from "../../stores/git";
import FilterBar from "./FilterBar";
import SidebarList from "./sidebarList/SidebarList";

import "./Sidebar.css";

interface IExternalProps {}

interface IInjectedProps extends IExternalProps {
    repoStore: RepositoryStore;
    branchStore: BranchStore;
}

@inject(({ stores }) => ({
    branchStore: stores.branchStore,
    repoStore: stores.repoStore
}))
@observer
class Sidebar extends React.Component {
    get injected() {
        return this.props as IInjectedProps;
    }

    onItemDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        this.injected.branchStore.checkOutBranch(event.currentTarget.textContent as string);
    };

    render() {
        return (
            <div className="sidebar">
                <FilterBar />
                <SidebarList
                    icon={GitBranch}
                    text="Branches"
                    listItems={this.injected.repoStore.localBranches}
                    highlightedItem={this.injected.branchStore.checkedOutBranch}
                    onItemDoubleClick={this.onItemDoubleClick}
                />
                <SidebarList icon={CloudOutlined} text="Remotes" listItems={this.injected.repoStore.remoteBranches} />
                <SidebarList icon={Tag} text="Tags" listItems={this.injected.repoStore.tags} />
                <SidebarList icon={Inbox} text="Stashes" listItems={this.injected.repoStore.stashes} />
            </div>
        );
    }
}

export default Sidebar;
