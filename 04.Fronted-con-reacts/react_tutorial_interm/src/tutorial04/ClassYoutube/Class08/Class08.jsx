import React, { useState } from "react";
// Stlye : 1:29:14
const style = {
    dark: {
        color: "white",
        backgroundColor: "black",
    },
    light: {
        color: "black",
        backgroundColor: "white",
    },
};

const Class08 = () => {
    // hook
    const [theme, setTheme] = useState(false);
    // function BTN
    const toggleTheme = () => {
        setTheme(!theme);
    };
    //
    const style01 = {};
    const style02 = theme ? style.dark : style.light; // theme ? {color: "", backgroundColor: ""} : {color: "", backgroundColor: ""}
    const style03 = { color: "green", backgroundColor: "red" };
    //
    return (
        <div className="container">
            {/* <h2 style={{}}> title </h2> */}
            <h2 style={style01}> External styling </h2>
            <h3 style={style02}> Internal styling </h3>
            <h4 style={style03}> Inline styling </h4>
            <button onClick={toggleTheme}>Change Theme</button>
        </div>
    );
};

export default Class08;
