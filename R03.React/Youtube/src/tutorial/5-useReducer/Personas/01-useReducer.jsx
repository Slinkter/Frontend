import React from "react";
import reducer from "./reducer";
import { data } from "../../../db/data";
import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from "./action";

const initialState = {
    people: data,
    isLoading: false,
};

const ReducerBasics = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const removeItem = (id) => {
        dispatch({ type: REMOVE_ITEM, payload: { id } });
    };
    const clearList = () => {
        dispatch({ type: CLEAR_LIST });
    };
    const resetList = () => {
        dispatch({ type: RESET_LIST });
    };

    /* Render  */
    console.log(state);

    return (
        <div>
            <h1>ReducerBasics</h1>
            {/* ---------------------------------------------- */}
            {state.people.map((person) => {
                return (
                    <div key={person.id} className="item">
                        <h4>{person.name}</h4>
                        <button onClick={() => removeItem(person.id)}>
                            remove
                        </button>
                    </div>
                );
            })}
            {/* ---------------------------------------------- */}
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
        </div>
    );
};

export default ReducerBasics;
