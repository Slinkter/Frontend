import React, { useReducer } from "react";

type TypeAction = {
    type: "incremente" | "decrement" | "reset";
};

type CounterState = {
    count: number;
    status: string;
};

const initialState: CounterState = {
    count: 0,
    status: "pending ...",
};

type CounterAction = TypeAction;

const counterReducer = (
    state: CounterState,
    action: CounterAction
): CounterState => {
    switch (action.type) {
        case "incremente":
            return state;
        case "decrement":
            return state;
        case "reset":
            return state;
        default:
            return state;
    }
};

const Component = () => {
    /* reducer */
    /* initial */
    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <div className="text-center flex flex-col gap-6 w-3/4 ">
            <h2>Count: 0</h2>
            <h2>Status: Active</h2>

            <div className="btn-container">
                <button
                    onClick={() => console.log("increment")}
                    className="btn"
                >
                    Increment
                </button>
                <button
                    onClick={() => console.log("decrement")}
                    className="btn"
                >
                    Decrement
                </button>
                <button onClick={() => console.log("reset")} className="btn">
                    Reset
                </button>
            </div>
            <div className="btn-container">
                <button
                    onClick={() => console.log("set status to active")}
                    className="btn"
                >
                    Set Status to Active
                </button>
                <button
                    className="btn"
                    onClick={() => console.log("set status to inactive")}
                >
                    Set Status to Inactive
                </button>
            </div>
        </div>
    );
};

export default Component;
