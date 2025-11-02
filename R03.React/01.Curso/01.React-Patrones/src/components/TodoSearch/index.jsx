import React from "react";
import { TodoContext } from "../TodoContext/index.jsx";
import "./TodoSearch.css";

/**
 * @file TodoSearch.jsx
 * @description A search input for filtering TODOs in real-time.
 * @returns {JSX.Element} - The TodoSearch component.
 */
function TodoSearch() {
    // Consume the context to get the search value and its dispatcher
    const { searchValue, setSearchValue } = React.useContext(TodoContext);

    /**
     * Handles the change event on the search input.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
     */
    const onSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <input
            className="TodoSearch"
            placeholder="Cebolla"
            value={searchValue}
            onChange={onSearchValueChange}
        />
    );
}

export { TodoSearch };
