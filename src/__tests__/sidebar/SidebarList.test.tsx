import { GitBranch } from "@githubprimer/octicons-react";
import { mount } from "enzyme";
import React from "react";
import SidebarList from "../../components/sidebar/sidebarList/SidebarList";

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
        const wrapper = mount(sidebarList);
        wrapper.find(".heading").simulate("click");

        expect(wrapper.find(".list-content")).toHaveLength(1);
        expect(wrapper.find(".list-content-collapsed")).toHaveLength(0);
    });

    it("renders the list items", () => {
        const listItems: string[] = ["firstItem", "secondItem", "thirdItem"];
        const component = <SidebarList icon={GitBranch} text="Branches" listItems={listItems} />;

        const wrapper = mount(component);
        wrapper.find(".heading").simulate("click");

        // check that the list has 3 items
        expect(wrapper.find(".list-content").children()).toHaveLength(3);
        // check that they are rendered in the correct order
        wrapper
            .find(".list-content")
            .children()
            .forEach((wrapperObject, index) => {
                expect(wrapperObject.text()).toEqual(listItems[index]);
            });
    });
});
