import React from "react";
import Tabs from "./tab";
import "./tab.css";

function RandomComponent() {
    return <h1> Some Random Content</h1>;
}

const t1 = { label: "tab 1", content: <div>This is content for Tab 1</div> };
const t2 = { label: "tab 2", content: <div>This is content for Tab 2</div> };
const t3 = { label: "tab 3", content: <RandomComponent /> };
const ListTabs = [t1, t2, t3];

const TabTest = () => {
    /* FUNCION */
    function handleChange(currentTabIndex) {
        console.log(currentTabIndex);
    }

    /* RENDER */
    return (
        <>
            <Tabs tabsContent={ListTabs} onChange={handleChange} />
        </>
    );
};

export default TabTest;
