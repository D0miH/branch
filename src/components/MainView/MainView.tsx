import React from "react";
import "./MainView.css";
import CommitList from "./commitHistory/CommitList";
import CommitInfo from "../commitInfo/CommitInfo";

class MainView extends React.Component {
    render() {
        return (
            <div className="main-view">
                <CommitList />
                <CommitInfo />
            </div>
        );
    }
}

export default MainView;
