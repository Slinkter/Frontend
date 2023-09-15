import React from "react";
import useCounter from "../hook/useCounter";

const CounterApp = () => {
    const [counter, incrementar, reset] = useCounter(0);

    return (
        <div>
            <h1> click {counter}</h1>
            <button onClick={incrementar}>+</button>
            <button onClick={reset}>0</button>
        </div>
    );
};

export default CounterApp;
