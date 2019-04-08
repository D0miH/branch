import { mount } from "enzyme";
import React from "react";
import FilterBar from "../../components/sidebar/FilterBar";

describe("<FilterBar />", () => {
    it("renders without error", () => {
        mount(<FilterBar />);
    });
});
