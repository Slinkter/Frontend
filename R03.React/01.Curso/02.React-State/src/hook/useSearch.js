import { useReducer } from "react";

const initialState = {
    searchValue: "",
};

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

function useSearch() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const searchValue = state.searchValue;

    const setSearchValue = (value) => {
        dispatch({ type: "SET_SEARCH_VALUE", payload: value });
    };

    return { searchValue, setSearchValue };
}

export { useSearch };
