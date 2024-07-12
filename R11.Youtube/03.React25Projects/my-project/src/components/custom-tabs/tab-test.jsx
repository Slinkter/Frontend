import React from "react";
import Tabs from "./tab";
import "./tab.css";

function RandomComponent() {
  return <h1> Some Random Content</h1>;
}

const t1 = { label: "tab 1", content: <div>This is content for Tab 1</div> };
const t2 = { label: "tab 2", content: <div>This is content for Tab 2</div> };
const t3 = { label: "tab 3", content: <RandomComponent /> };

const tabs = [t1, t2, t3];

const TabTest = () => {
  function handleChange(currentTabIndex) {
    console.log(currentTabIndex);
  }
  return (
    <div>
      <Tabs tabsContent={tabs} onChange={handleChange} />
    </div>
  );
};

export default TabTest;
