import React from "react";
import { useState } from "react";

const Tabs = ({ tabsContent = [], onChange }) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    /*  */
    function handleOnClick(index) {
        setCurrentTabIndex(index);
        onChange(index);
    }

    /*  */
    return (
        <div className="wrapper-tab">
            <div className="heading">
                {tabsContent &&
                    tabsContent.map((tabItem, index) => (
                        <div
                            key={index}
                            onClick={() => handleOnClick(index)}
                            className={`tab-item ${
                                currentTabIndex === index && "active"
                            }`}
                        >
                            <span className="label">{tabItem.label}</span>
                        </div>
                    ))}
            </div>
            <div className="content" style={{ color: "red" }}>
                {tabsContent[currentTabIndex] &&
                    tabsContent[currentTabIndex].content}
            </div>
        </div>
    );
};

export default Tabs;
