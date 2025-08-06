import { useState } from "react";
import data from "./data";
import "./style.css";

const Accordian = () => {
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [select, setSelect] = useState(null);
    const [multiple, setMultiple] = useState([]);

    const handleSelection = (id) => {
        if (enableMultiSelection) {
            setMultiple((prev) =>
                prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
            );
        } else {
            setSelect((prev) => (prev === id ? null : id));
        }
    };

    const isItemSelected = (id) => {
        return enableMultiSelection ? multiple.includes(id) : select === id;
    };

    return (
        <div className="wrapper">
            <button onClick={() => setEnableMultiSelection((prev) => !prev)}>
                {enableMultiSelection
                    ? "Disenable multiSelection"
                    : "Enable multiSelection"}
            </button>
            <div className="accordian">
                {data ? (
                    data.map((item) => (
                        <div className="item" key={item.id}>
                            <div
                                className="title"
                                onClick={() => handleSelection(item.id)}
                            >
                                <span>{item.question} </span>
                                <span>+</span>
                            </div>
                            {isItemSelected(item.id) && (
                                <div className="content">{item.answer}</div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>no data found!</div>
                )}
            </div>
        </div>
    );
};

export default Accordian;
