import React from "react";
import { reducer } from "./reducer";
import { initialState } from "./state";
import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from "./action";

const ReducerBasics = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const removeItem = (id) => {
        const exec = { type: REMOVE_ITEM, payload: { id } };
        dispatch(exec);
    };
    const clearList = () => {
        const exec = { type: CLEAR_LIST };
        dispatch(exec);
    };
    const resetList = () => {
        const exec = { type: RESET_LIST };
        dispatch(exec);
    };

    console.log(state);
    /* Render  */
    return (
        <>
            <h1>Reducer Basics</h1>

            {state.people.map(({ id, name }) => (
                <div key={id} className="item">
                    <h4>{name}</h4>
                    <button onClick={() => removeItem(id)}>remove</button>
                </div>
            ))}

            {state.people.length < 1 ? (
                <button
                    className="btn"
                    style={{ marginTop: "2rem" }}
                    onClick={resetList}
                >
                    reset
                </button>
            ) : (
                <button
                    className="btn"
                    style={{ marginTop: "2rem" }}
                    onClick={clearList}
                >
                    clear
                </button>
            )}
        </>
    );
};

export default ReducerBasics;
