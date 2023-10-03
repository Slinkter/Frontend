import { useReducer } from "react";

const types = {
    increment: "increment",
    decrement: "decrement",
    reset: "reset",
};

const initState = 0;

const init = (value) => {
    return value;
};

const reducer = (state, action) => {
    switch (action.type) {
        case types.increment:
            return state + 1;
        case types.decrement:
            return state - 1;
        case types.reset:
            return 0;
        default:
            return initState;
    }
};

const CounterApp = () => {
    const [state, dispatch] = useReducer(reducer, initState, init);

    return (
        <div>
            <h1> Counter {state} </h1>
            <button onClick={() => dispatch({ type: types.increment })}>
                +
            </button>
            <button onClick={() => dispatch({ type: types.decrement })}>
                -
            </button>
            <button onClick={() => dispatch({ type: types.reset })}>0</button>
        </div>
    );
};

export default CounterApp;
