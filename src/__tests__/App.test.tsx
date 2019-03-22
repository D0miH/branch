import React from "react";
import { shallow } from "enzyme";
import App from "../components/App";
import { Provider } from "mobx-react";
import { ToolbarStore } from "../stores";
import GitStore from "../stores/GitStore";

describe("<App />", () => {
    it("renders without error", () => {
        let gitStore: GitStore = new GitStore();
        const stores = {
            toolbarStore: new ToolbarStore(),
            repoStore: gitStore.repoStore
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
