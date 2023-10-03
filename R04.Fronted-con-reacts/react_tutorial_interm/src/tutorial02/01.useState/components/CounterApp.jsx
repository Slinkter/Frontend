import React, { useState } from "react";
import "./CounterApp.css";

const CounterApp = () => {
    const [counter, setCounter] = useState(0);

    return (
        <div>
            <h1 className="h1StyleText"> click {counter}</h1>
            <button
                className="btnStyleCounter"
                onClick={() => setCounter(counter + 1)}
            >
                incremntar
            </button>
            <button
                className="btnStyleCounter"
                onClick={() => setCounter(counter - 1)}
            >
                decremntar
            </button>
            <button className="btnStyleCounter" onClick={() => setCounter(0)}>
                reset
            </button>
        </div>
    );
};

export default CounterApp;
