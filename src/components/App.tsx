import React, { Component } from "react";
import Titlebar from "./Titlebar";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="AppContent" />
                <Titlebar />
            </div>
        );
    }
}

export default App;
