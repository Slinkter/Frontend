import React, { useReducer } from "react";
// 1
const types = {
    increment: "increment",
    decrease: "decrease",
    reset: "reset",
};
//2
const initialState = { count: 0 };
// 3
function reducer(state, action) {
    switch (action.type) {
        case types.increment:
            return { count: state.count + action.payload };
        case types.decrease:
            return { count: state.count - action.payload };
        case types.reset:
            return { count: 0 };
        default:
            return state;
    }
}

const CounterReducer = () => {
    //
    const [state, dispatch] = useReducer(reducer, initialState);
    //
    const handleIncrement = () => {
        dispatch({ type: types.increment, payload: 1 });
    };
    const handleDecrease = () => {
        dispatch({ type: types.decrease, payload: 1 });
    };
    const handleReset = () => {
        dispatch({ type: types.reset });
    };

    return (
        <div className="App">
            <p>Count :{state.count}</p>
            <button onClick={handleIncrement}> + </button>
            <button onClick={handleDecrease}> - </button>
            <button onClick={handleReset}> 0 </button>
        </div>
    );
};

export default CounterReducer;
