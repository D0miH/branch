import React, { Component } from "react";
import { observer } from "mobx-react";
import Titlebar from "./Titlebar";
import Toolbar from "./Toolbar/Toolbar";
import Sidebar from "./Sidebar/Sidebar";
import MainView from "./MainView/MainView";
import { IAppStore } from "../stores/stores";

import "./App.css";

type Props = {
    appStore: IAppStore;
};

@observer
class App extends Component<Props> {
    render() {
        return (
            <div className="App">
                <Titlebar />
                <div className="AppContent">
                    <Toolbar toolbarStore={this.props.appStore.toolbarStore} />
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
