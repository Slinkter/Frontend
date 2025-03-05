import React, { useReducer } from "react";
import { data } from "../../../data";
import reducer from "./reducer";
import { CLEAR_LIST, REMOVE_ITEM, RESET_LIST } from "./actions";

const defaultState = {
    people: data, // [{id,name}]
    isLoading: false,
};

const ReducerBasics = () => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const removeItem = (id) => {
        dispatch({ type: REMOVE_ITEM, payload: { id } });
    };
    const clearList = () => {
        dispatch({ type: CLEAR_LIST });
    };
    const resetList = () => {
        dispatch({ type: RESET_LIST });
    };
    return (
        <div>
            {state.people.map((person) => {
                const { id, name } = person;
                return (
                    <div key={id} className="item">
                        <h4>{name}</h4>
                        <button onClick={() => removeItem(id)}>remove</button>
                    </div>
                );
            })}
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
                    clear items
                </button>
            )}
        </div>
    );
};

export default ReducerBasics;
