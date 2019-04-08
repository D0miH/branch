import FilterIcon from "@material-ui/icons/FilterList";
import React from "react";

import "./FilterBar.css";

class FilterBar extends React.Component {
    render() {
        return (
            <div className="filterbar">
                <input type="text" placeholder="Filter" />
                <FilterIcon className="filter-icon" />
            </div>
        );
    }
}

export default FilterBar;
