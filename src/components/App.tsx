import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import Titlebar from "./Titlebar";
import Toolbar from "./toolbar/Toolbar";
import Sidebar from "./sidebar/Sidebar";
import MainView from "./mainView/MainView";
import { RepositoryStore } from "../stores/Git";
import { CommitSidebarStore } from "../stores";

import "./App.css";
import getLocalStorageInstance from "../stores/LocalStorage";

interface ExternalProps {}

interface InjectedProps extends ExternalProps {
    repoStore: RepositoryStore;
    commitSidebarStore: CommitSidebarStore;
}

@inject(({ stores }) => ({
    repoStore: stores.repoStore,
    commitSidebarStore: stores.commitSidebarStore
}))
@observer
class App extends Component<ExternalProps> {
    get injected() {
        return this.props as InjectedProps;
    }

    componentDidMount() {
        let lastOpenedRepo = getLocalStorageInstance().lastOpenedRepo;
        this.injected.repoStore.openRepo(lastOpenedRepo.repoPath);
    }

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
