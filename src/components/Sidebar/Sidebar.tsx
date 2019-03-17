import React from "react";
import { inject, observer } from "mobx-react";
import { GitBranch, Tag } from "@githubprimer/octicons-react";
import { CloudOutlined } from "@material-ui/icons";
import FilterBar from "./FilterBar";
import SidebarList from "./SidebarList/SidebarList";
import "./Sidebar.css";
import { RepositoryStore } from "../../stores";

interface ExternalProps {}

interface InjectedProps extends ExternalProps {
    repoStore: RepositoryStore;
}

@inject(({ stores }) => ({
    repoStore: stores.repoStore
}))
@observer
class Sidebar extends React.Component {
    get injected() {
        return this.props as InjectedProps;
    }

    render() {
        return (
            <div className="sidebar">
                <FilterBar />
                <SidebarList
                    icon={GitBranch}
                    text="Branches"
                    listItems={this.injected.repoStore.localBranches}
                />
                <SidebarList
                    icon={CloudOutlined}
                    text="Remotes"
                    listItems={this.injected.repoStore.remoteBranches}
                />
                <SidebarList
                    icon={Tag}
                    text="Tags"
                    listItems={this.injected.repoStore.tags}
                />
            </div>
        );
    }
}

export default Sidebar;
