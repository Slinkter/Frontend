import React from "react";
import Tab from "./Tab";

function RandomComponent() {
    return <h1> Some Random Content</h1>;
}

const t1 = { label: "tab 1", content: <div>This is content for Tab 1</div> };
const t2 = { label: "tab 2", content: <div>This is content for Tab 2</div> };
const t3 = { label: "tab 3", content: <RandomComponent /> };

const CustomTab = () => {
    const ListTabs = [t1, t2, t3];
    const handleAlert = (index) => {
        alert("esto es alert" + index);
    };

    return (
        <div>
            <Tab list={ListTabs} handFunc={handleAlert} />
        </div>
    );
};

export default CustomTab;
