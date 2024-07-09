import React, { useState } from "react";

const CounterApp = () => {
    const [counter, setCounter] = useState(0);

    return (
        <div className="container" style={{ border: "1px solid red" }}>
            <h1>click {counter}</h1>
            <button className="btn" onClick={() => setCounter(counter + 1)}>
                incrementar
            </button>
            <button className="btn" onClick={() => setCounter(counter - 1)}>
                decrementar
            </button>
            <button className="btn" onClick={() => setCounter(0)}>
                reset counter
            </button>
        </div>
    );
};

export default CounterApp;
