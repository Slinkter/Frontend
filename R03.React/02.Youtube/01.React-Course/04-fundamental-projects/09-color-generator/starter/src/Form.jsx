import React from "react";
import { useState } from "react";

const Form = ({ addColor }) => {
    const [color, setColor] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        addColor(color);
    };

    console.log("color:", color);

    return (
        <section className="container">
            <h4> Color Theme</h4>
            <form className="color-form" onSubmit={handleSubmit}>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
                <button
                    className="btn"
                    type="submit"
                    style={{ background: color }}
                >
                    submit
                </button>
            </form>
        </section>
    );
};

export default Form;
