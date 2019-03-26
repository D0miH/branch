import React from "react";
import "./MainView.css";
import CommitList from "./CommitHistory/CommitList";

class MainView extends React.Component {
    render() {
        return (
            <div className="main-view">
                <CommitList />
            </div>
        );
    }
}

export default MainView;
