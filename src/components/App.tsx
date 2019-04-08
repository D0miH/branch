import { inject, observer } from "mobx-react";
import React, { Component } from "react";

import { CommitSidebarStore } from "../stores";
import { RepositoryStore } from "../stores/git";
import getLocalStorageInstance from "../stores/LocalStorage";
import MainView from "./mainView/MainView";
import Sidebar from "./sidebar/Sidebar";
import Titlebar from "./Titlebar";
import Toolbar from "./toolbar/Toolbar";

import "./App.css";

interface IExternalProps {}

interface IInjectedProps extends IExternalProps {
    repoStore: RepositoryStore;
    commitSidebarStore: CommitSidebarStore;
}

@inject(({ stores }) => ({
    commitSidebarStore: stores.commitSidebarStore,
    repoStore: stores.repoStore
}))
@observer
class App extends Component<IExternalProps> {
    get injected() {
        return this.props as IInjectedProps;
    }

    componentDidMount() {
        const lastOpenedRepo = getLocalStorageInstance().lastOpenedRepo;
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
