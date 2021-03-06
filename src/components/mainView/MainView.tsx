import React from "react";
import CommitList from "./commitHistory/CommitList";
import CommitInfoSidebar from "./commitInfoSidebar/CommitInfoSidebar";

import "./MainView.css";

class MainView extends React.Component {
    render() {
        return (
            <div className="main-view">
                <CommitList />
                <CommitInfoSidebar />
            </div>
        );
    }
}

export default MainView;
