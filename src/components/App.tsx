import React, { Component } from "react";
import Titlebar from "./Titlebar";
import Toolbar from "./Toolbar/Toolbar";
import Sidebar from "./Sidebar/Sidebar";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Titlebar />
                <div className="AppContent">
                    <Toolbar />
                    <div className="MainView">
                        <Sidebar />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
