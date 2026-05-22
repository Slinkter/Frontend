import { useReducer } from "react";

// Estado inicial: Valor de búsqueda vacío por defecto
const initialState = {
    searchValue: "",
};

// Reducer: Actualiza el texto de búsqueda en el estado
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SEARCH_VALUE":
            return {
                ...state,
                searchValue: action.payload,
            };
        default:
            return state;
    }
};

/**
 * Custom hook to manage the search input state.
 */
function useSearch() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { searchValue } = state;

    // Dispatcher: Actualiza el valor de búsqueda mediante un payload
    const setSearchValue = (value) => {
        dispatch({ type: "SET_SEARCH_VALUE", payload: value });
    };

    return { searchValue, setSearchValue };
}

export { useSearch };
