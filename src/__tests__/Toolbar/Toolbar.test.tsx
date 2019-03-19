import React from "react";
import { Provider } from "mobx-react";
import { RepositoryStore, ToolbarStore } from "../../stores";
import { mount } from "enzyme";
import Toolbar from "../../components/Toolbar/Toolbar";

describe("<Toolbar />", () => {
    let repoStore: RepositoryStore;
    let toolbarStore: ToolbarStore;
    let toolbar: React.ComponentElement<any, any>;

    beforeEach(() => {
        repoStore = new RepositoryStore();
        toolbarStore = new ToolbarStore();
        toolbar = (
            <Provider stores={{ repoStore: repoStore, toolbarStore: toolbarStore }}>
                <Toolbar />
            </Provider>
        );
    });

    it("renders without error", () => {
        mount(toolbar);
    });

    it("renders the toolbar buttons", () => {
        expect(mount(toolbar).find("ToolbarButton")).toHaveLength(4);
    });

    it("renders the repository drop down list", () => {
        let wrapper = mount(toolbar);

        // asser that the list is hidden
        expect(toolbarStore.repoListVisible).toBeFalsy();

        // assert that when the drop down button is clicked the overlay is shown and the list is visible
        wrapper.find("RepoListDropDown").simulate("click");
        expect(toolbarStore.repoListVisible).toBeTruthy();
        expect(wrapper.find("Overlay")).toHaveLength(1);
    });
});
