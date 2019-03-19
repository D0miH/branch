import React, { Component } from "react";
import Titlebar from "./Titlebar";
import Toolbar from "./Toolbar/Toolbar";
import Sidebar from "./Sidebar/Sidebar";
import MainView from "./MainView/MainView";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="app">
                <Titlebar />
                <div className="app-content">
                    <Toolbar />
                    <div className="repository-view">
                        <Sidebar />
                        <MainView />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
