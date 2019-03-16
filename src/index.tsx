import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./components/App";
import AppStore from "./stores/AppStore";

import "./index.css";

const appStore: AppStore = new AppStore();

ReactDOM.render(<App appStore={appStore} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
