import React from "react";
import { shallow } from "enzyme";
import App from "../components/App";
import { Provider } from "mobx-react";
import { ToolbarStore, RepositoryStore } from "../stores";

describe("<App />", () => {
    it("renders without error", () => {
        const stores = {
            toolbarStore: new ToolbarStore(),
            repoStore: new RepositoryStore()
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
