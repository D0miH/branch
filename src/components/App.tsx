import React, { Component } from "react";
import { observer } from "mobx-react";
import Titlebar from "./Titlebar";
import Toolbar from "./Toolbar/Toolbar";
import Sidebar from "./Sidebar/Sidebar";
import MainView from "./MainView/MainView";
import { IAppStore } from "../stores/store-types";

import "./App.css";

type Props = {
    appStore: IAppStore;
};

@observer
class App extends Component<Props> {
    render() {
        return (
            <div className="app">
                <Titlebar />
                <div className="app-content">
                    <Toolbar toolbarStore={this.props.appStore.toolbarStore} />
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
