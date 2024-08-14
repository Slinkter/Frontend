import React, { useState } from "react";

// component must be uppercase
const UseStateBasics = () => {
    //
    const [text, setText] = useState("random title");
    //
    const handleClick = () => {
        if (text === "random title") {
            setText("hello world");
        } else {
            setText("random title");
        }
    };

    return (
        <>
            <h1>{text}</h1>
            <button type="button" className="btn" onClick={handleClick}>
                change title
            </button>
        </>
    );
};

export default UseStateBasics;

//   const value = useState()[0];
//   const handler = useState()[1];
//   console.log(value, handler);
