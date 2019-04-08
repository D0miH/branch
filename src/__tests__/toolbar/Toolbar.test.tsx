import { mount } from "enzyme";
import { Provider } from "mobx-react";
import React from "react";
import Toolbar from "../../components/toolbar/Toolbar";
import { ToolbarStore } from "../../stores";
import GitStore from "../../stores/GitStore";

describe("<Toolbar />", () => {
    let gitStore: GitStore;
    let toolbarStore: ToolbarStore;
    let toolbar: React.ComponentElement<any, any>;

    beforeEach(() => {
        gitStore = new GitStore();
        toolbarStore = new ToolbarStore();
        toolbar = (
            <Provider stores={{ repoStore: gitStore.repoStore, toolbarStore: toolbarStore }}>
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
        const wrapper = mount(toolbar);

        // asser that the list is hidden
        expect(toolbarStore.repoListVisible).toBeFalsy();

        // assert that when the drop down button is clicked the overlay is shown and the list is visible
        wrapper.find("RepoListDropDown").simulate("click");
        expect(toolbarStore.repoListVisible).toBeTruthy();
        expect(wrapper.find("Overlay")).toHaveLength(1);
    });
});
