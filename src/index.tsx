import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import * as serviceWorker from "./serviceWorker";

import App from "./components/App";
import ToolbarStore from "./stores/ToolbarStore";

import "./index.css";

const stores = {
    toolbarStore: new ToolbarStore()
};

ReactDOM.render(
    <Provider stores={stores}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
