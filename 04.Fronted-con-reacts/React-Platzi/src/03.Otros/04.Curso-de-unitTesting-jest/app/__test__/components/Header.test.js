import React from "react";
import { mount, shallow } from "enzyme";
import ProviderMock from "../../__mocks__/ProviderMock";
import Header from "../../components/Header";

describe("<Header/>", () => {
    test("Render del component Header", () => {
        const header = shallow(
            <ProviderMock>
                <Header />
            </ProviderMock>
        );
        expect(header.length).toEqual(1);
    });

    test("Render Title", () => {
        const header = mount(
            <ProviderMock>
                <Header />
            </ProviderMock>
        );
        expect(header.find(".Header-title").text()).toEqual("Team Store");
    });
});
