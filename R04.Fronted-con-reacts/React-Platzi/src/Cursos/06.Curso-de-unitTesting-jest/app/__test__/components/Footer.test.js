import React from "react";
import { mount } from "enzyme";
import Footer from "../../components/Footer";

describe("<Footer/>", () => {
    test("Render de component Footer", () => {
        const footer = mount(<Footer />);
        expect(footer.length).toEqual(1);
    });
    test("Render del tiele-Footer", () => {
        const footer = mount(<Footer />);
        expect(footer.find(".Footer-title").text()).toEqual("Team Store");
    });
});
