import React, { Component } from "react";
import Titlebar from "./Titlebar";
import Toolbar from "./toolbar/Toolbar";
import Sidebar from "./sidebar/Sidebar";
import MainView from "./mainView/MainView";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="app">
                {window.navigator.platform === "MacIntel" ? <Titlebar /> : null}
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
