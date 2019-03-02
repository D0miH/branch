import React, { Component } from "react";
import Titlebar from "./Titlebar";
import Toolbar from "./Toolbar/Toolbar";
import Sidebar from "./Sidebar/Sidebar";
import "./App.css";
import MainView from "./MainView/MainView";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Titlebar />
                <div className="AppContent">
                    <Toolbar />
                    <div className="RepositoryView">
                        <Sidebar />
                        <MainView />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
