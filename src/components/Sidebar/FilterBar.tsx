import React from "react";
import FilterIcon from "@material-ui/icons/FilterList";
import "./FilterBar.css";

class FilterBar extends React.Component {
    render() {
        return (
            <div className="FilterBar">
                <input type="text" placeholder="Filter" />
                <FilterIcon className="FilterIcon" />
            </div>
        );
    }
}

export default FilterBar;
