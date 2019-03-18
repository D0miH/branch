import React from "react";
import { mount } from "enzyme";
import FilterBar from "../../components/Sidebar/FilterBar";

describe("<FilterBar />", () => {
    it("renders without error", () => {
        mount(<FilterBar />);
    });
});
