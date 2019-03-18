import React from "react";
import { mount } from "enzyme";
import { GitBranch } from "@githubprimer/octicons-react";
import SidebarList from "../../components/Sidebar/SidebarList/SidebarList";

describe("<SidebarList />", () => {
    let sidebarList: React.ComponentElement<{}, any>;

    beforeAll(() => {
        sidebarList = <SidebarList icon={GitBranch} text="Branches" listItems={[]} />;
    });

    it("renders without error", () => {
        mount(sidebarList);
    });

    it("is collapsed on start", () => {
        expect(mount(sidebarList).find(".list-content-collapsed")).toHaveLength(1);
        expect(mount(sidebarList).find(".list-content")).toHaveLength(0);
    });

    it("is expanded when clicked on", () => {
        let wrapper = mount(sidebarList);
        wrapper.find(".heading").simulate("click");

        expect(wrapper.find(".list-content")).toHaveLength(1);
        expect(wrapper.find(".list-content-collapsed")).toHaveLength(0);
    });

    it("renders the list items", () => {
        let listItems: string[] = ["firstItem", "secondItem", "thirdItem"];
        let component = <SidebarList icon={GitBranch} text="Branches" listItems={listItems} />;

        let wrapper = mount(component);
        wrapper.find(".heading").simulate("click");

        // check that the list has 3 items
        expect(wrapper.find(".list-content").children()).toHaveLength(3);
        // check that they are rendered in the correct order
        wrapper
            .find(".list-content")
            .children()
            .forEach((wrapper, index) => {
                expect(wrapper.text()).toEqual(listItems[index]);
            });
    });
});
