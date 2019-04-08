import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import * as serviceWorker from "./serviceWorker";

import App from "./components/App";
import { CommitSidebarStore, ToolbarStore } from "./stores";
import GitStore from "./stores/GitStore";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const gitStore = new GitStore();

const stores = {
    branchStore: gitStore.branchStore,
    commitSidebarStore: new CommitSidebarStore(),
    repoStore: gitStore.repoStore,
    toolbarStore: new ToolbarStore()
};

ReactDOM.render(
    <Provider stores={stores}>
        <div className="app-root">
            <App />
            <ToastContainer position="bottom-right" autoClose={5000} pauseOnFocusLoss={false} />
        </div>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
