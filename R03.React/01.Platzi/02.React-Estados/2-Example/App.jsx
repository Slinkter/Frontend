import React from "react";
import ExampleUseState from "./ExampleUseState";
import ExampleClassState from "./ExampleClassState";
import UseReducer from "./UseReducer";

const App = () => {
    const stylecustom = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: 20,
    };

    return (
        <div className="App" style={stylecustom}>
            <ExampleClassState nameprops="Class State" />
            <ExampleUseState nameprops="Use State" />
            <UseReducer />
        </div>
    );
};

export default App;
