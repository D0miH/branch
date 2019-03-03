import React from "react";
import FilterBar from "./FilterBar";
import BranchList from "./BranchList";
import "./Sidebar.css";

class Sidebar extends React.Component {
    render() {
        return (
            <div className="Sidebar">
                <FilterBar />
                <BranchList />
            </div>
        );
    }
}

export default Sidebar;
