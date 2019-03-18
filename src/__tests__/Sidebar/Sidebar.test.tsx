import React, { Component } from "react";
import { mount } from "enzyme";
import { Provider } from "mobx-react";
import { RepositoryStore } from "../../stores";
import Sidebar from "../../components/Sidebar/Sidebar";

describe("<Sidebar />", () => {
    let repoStore: RepositoryStore;
    let sidebar: React.ComponentElement<{ repoStore: RepositoryStore }, any>;

    beforeEach(() => {
        repoStore = new RepositoryStore();
        sidebar = (
            <Provider stores={{ repoStore: repoStore }}>
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
