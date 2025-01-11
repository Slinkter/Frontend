import { useState } from "react";

const Tab = ({ list, handFunc }) => {
    const [currentTab, setCurrentTab] = useState(0);

    const loadAlert = (index) => {
        setCurrentTab(index);
        handFunc(index + 1);
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid red",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row ",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid red",
                }}
            >
                {list &&
                    list.map((l, index) => (
                        <div
                            key={index}
                            onClick={() => loadAlert(index)}
                            style={{
                                backgroundColor:
                                    index === currentTab ? "red" : "green",
                                width: "100px",
                                textAlign: "center",
                            }}
                        >
                            {l.label}
                        </div>
                    ))}
            </div>
            <hr />
            <div
                style={{
                    border: "1px solid green",
                }}
            >
                {list && list[currentTab].content}
            </div>
        </div>
    );
};

export default Tab;
