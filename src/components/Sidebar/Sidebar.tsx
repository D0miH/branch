import React from "react";
import { inject, observer } from "mobx-react";
import { GitBranch, Tag, Inbox } from "@githubprimer/octicons-react";
import { CloudOutlined } from "@material-ui/icons";
import FilterBar from "./FilterBar";
import SidebarList from "./SidebarList/SidebarList";
import "./Sidebar.css";
import { RepositoryStore, BranchStore } from "../../stores";

interface ExternalProps {}

interface InjectedProps extends ExternalProps {
    repoStore: RepositoryStore;
    branchStore: BranchStore;
}

@inject(({ stores }) => ({
    repoStore: stores.repoStore,
    branchStore: stores.branchStore
}))
@observer
class Sidebar extends React.Component {
    get injected() {
        return this.props as InjectedProps;
    }

    onItemDoubleClick = () => {};

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
