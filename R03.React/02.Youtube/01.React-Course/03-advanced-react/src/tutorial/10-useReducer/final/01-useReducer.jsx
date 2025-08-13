import { useReducer } from "react";
import { data } from "../../../data";
import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from "./actions";
import reducer from "./reducer";

// Estado inicial del reducer
const initialState = {
    people: data,
    isLoading: false,
};

const ReducerBasics = () => {
    // useReducer para manejar el estado complejo
    const [state, dispatch] = useReducer(reducer, initialState);

    // Acción: eliminar una persona por ID
    const removeItem = (id) => {
        dispatch({ type: REMOVE_ITEM, payload: { id } });
    };

    // Acción: limpiar la lista completa
    const clearList = () => {
        dispatch({ type: CLEAR_LIST });
    };

    // Acción: restaurar la lista original
    const resetList = () => {
        dispatch({ type: RESET_LIST });
    };

    return (
        <div>
            {/* Renderizar cada persona */}
            {state.people.map(({ id, name }) => (
                <div key={id} className="item">
                    <h4>{name}</h4>
                    <button onClick={() => removeItem(id)}>Remove</button>
                </div>
            ))}

            {/* Mostrar botón según el estado de la lista */}
            {state.people.length < 1 ? (
                <button
                    className="btn"
                    style={{ marginTop: "2rem" }}
                    onClick={resetList}
                >
                    Reset
                </button>
            ) : (
                <button
                    className="btn"
                    style={{ marginTop: "2rem" }}
                    onClick={clearList}
                >
                    Clear
                </button>
            )}
        </div>
    );
};

export default ReducerBasics;
