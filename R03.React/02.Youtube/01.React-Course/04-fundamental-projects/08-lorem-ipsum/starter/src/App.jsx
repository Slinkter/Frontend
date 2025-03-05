import React from "react";
import text from "./data";
import { useState } from "react";

const App = () => {
    const [count, setCount] = useState(1);
    const [list, setList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let cant = parseInt(count);
        if (cant > 0) {
            setList(text.slice(0, cant));
        }
    };

    return (
        <section className="section-center">
            <h4>tired of boring lorem ipsum?</h4>
            <form className="lorem-form" onSubmit={handleSubmit}>
                <label htmlFor="amount">Paragraphs : </label>
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    value={count}
                    step={1}
                    min="1"
                    max="8"
                    onChange={(e) => setCount(e.target.value)}
                />
                <button className="btn" type="submit">
                    generate
                </button>
            </form>

            <article className="lorem-text">
                {list &&
                    list.map((item) => {
                        return <p key={item}>{item}</p>;
                    })}
            </article>

            <pre>{JSON.stringify(text, null, 2)}</pre>
        </section>
    );
};

export default App;
