import React from "react";
import FilterBar from "./FilterBar";
import "./Sidebar.css";

class Sidebar extends React.Component {
    render() {
        return (
            <div className="Sidebar">
                <FilterBar />
            </div>
        );
    }
}

export default Sidebar;
