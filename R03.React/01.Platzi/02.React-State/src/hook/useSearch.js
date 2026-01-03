import { useReducer } from "react";

/**
 * The initial state for the search reducer.
 * @type {{searchValue: string}}
 */
const initialState = {
    searchValue: "",
};

/**
 * Reducer for managing the search state.
 * @param {object} state The current state.
 * @param {{type: string, payload: any}} action The dispatched action.
 * @returns {object} The new state.
 */
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
 *
 * @returns {{
 *  searchValue: string,
 *  setSearchValue: function(string): void
 * }} An object containing the current search value and a function to update it.
 */
function useSearch() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { searchValue } = state;

    /**
     * Updates the search value state.
     * @param {string} value The new search value.
     */
    const setSearchValue = (value) => {
        dispatch({ type: "SET_SEARCH_VALUE", payload: value });
    };

    return { searchValue, setSearchValue };
}

export { useSearch };
