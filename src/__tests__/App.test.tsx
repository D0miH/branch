import { shallow } from "enzyme";
import { Provider } from "mobx-react";
import React from "react";
import App from "../components/App";
import { ToolbarStore } from "../stores";
import GitStore from "../stores/GitStore";

describe("<App />", () => {
    it("renders without error", () => {
        const gitStore: GitStore = new GitStore();
        const stores = {
            repoStore: gitStore.repoStore,
            toolbarStore: new ToolbarStore()
        };

        shallow(
            <Provider stores={stores}>
                <div>
                    <App />
                </div>
            </Provider>
        );
    });
});
