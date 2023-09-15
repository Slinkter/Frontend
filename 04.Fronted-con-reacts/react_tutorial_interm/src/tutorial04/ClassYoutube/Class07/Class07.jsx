import React, { useState } from "react";

const styleDiv = {
    display: "flex",
    flexDirection: "column",
    width: 400,
    background: "red",
    margin: "0 auto",
};
const styleInput = {
    background: "green",
    margin: "10px",
    border: "1px solid blue",
    width: 340,
    color: "white",
};

const Class07 = () => {
    const [data, setData] = useState({});

    const getInputs = (e) => {
        const { name, value } = e.target;
        const input = { [name]: value };
        //
        const values = { ...data, ...input };
        setData(values);
        console.log(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    };

    const handleReset = () => {
        setData({});
    };

    return (
        <div className="container" style={styleDiv}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    style={styleInput}
                    type="text"
                    name="name"
                    onChange={(e) => getInputs(e)}
                    placeholder="write name"
                />
                <input
                    style={styleInput}
                    type="number"
                    name="age"
                    onChange={(e) => getInputs(e)}
                    placeholder="write age"
                />
                <input
                    style={styleInput}
                    type="text"
                    name="hobbie"
                    onChange={(e) => getInputs(e)}
                    placeholder="write hobbies"
                />
                <input
                    style={styleInput}
                    type="date"
                    name="date"
                    onChange={(e) => getInputs(e)}
                    placeholder="write a date"
                />
                <button type="submit">submit</button>
                <button type="reset" onClick={handleReset}>
                    reset
                </button>
            </form>
        </div>
    );
};

export default Class07;
