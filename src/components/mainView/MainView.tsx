import React from "react";
import "./MainView.css";
import CommitList from "./commitHistory/CommitList";
import CommitInfoSidebar from "./commitInfoSidebar/CommitInfoSidebar";

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
