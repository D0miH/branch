import React from "react";
import { GitBranch, Tag } from "@githubprimer/octicons-react";
import { CloudOutlined } from "@material-ui/icons";
import FilterBar from "./FilterBar";
import SidebarList from "./SidebarList/SidebarList";
import "./Sidebar.css";

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <FilterBar />
                <SidebarList icon={GitBranch} text="Branches" counter={0} />
                <SidebarList icon={CloudOutlined} text="Remotes" counter={0} />
                <SidebarList icon={Tag} text="Tags" counter={0} />
            </div>
        );
    }
}

export default Sidebar;
