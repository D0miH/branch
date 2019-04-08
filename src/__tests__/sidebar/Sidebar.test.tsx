import { mount } from "enzyme";
import { Provider } from "mobx-react";
import React, { Component } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { BranchStore, RepositoryStore } from "../../stores/git";
import GitStore from "../../stores/GitStore";

describe("<Sidebar />", () => {
    let gitStore: GitStore;
    let sidebar: React.ComponentElement<{ repoStore: RepositoryStore; branchStore: BranchStore }, any>;

    beforeEach(() => {
        gitStore = new GitStore();
        sidebar = (
            <Provider stores={{ repoStore: gitStore.repoStore, branchStore: gitStore.branchStore }}>
                <Sidebar />
            </Provider>
        );
    });

    it("renders without error", () => {
        mount(sidebar);
    });

    it("renders the filterbar", () => {
        expect(mount(sidebar).find("FilterBar")).toHaveLength(1);
    });

    it("renders 4 sidebar lists", () => {
        expect(mount(sidebar).find("SidebarList")).toHaveLength(4);
    });
});
