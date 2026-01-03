/**
 * @file A component that provides a search input for filtering the TODO list.
 * @description This component renders an input field that allows users to type a search query.
 * It consumes the `TodoContext` to get the current `searchValue` and the function to update it (`setSearchValue`).
 * The component's state is controlled by the global context, making it a "controlled component".
 * This is a key part of the user interface for navigating a potentially long list of TODOs.
 */

import React from "react";
import { TodoContext } from "../TodoContext/index.jsx";
import "./TodoSearch.css";

/**
 * A search input component for filtering TODOs.
 * It's a controlled component whose state is managed by the `TodoContext`.
 *
 * @returns {JSX.Element} An `<input>` element configured for searching.
 */
function TodoSearch() {
    // Consume the global context to get the search value and its state updater function.
    // This decouples the component from direct state management.
    const { searchValue, setSearchValue } = React.useContext(TodoContext);

    /**
     * Event handler for the input's `onChange` event.
     * It calls the `setSearchValue` function from the context to update the global search state
     * with every keystroke, enabling real-time filtering.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The DOM change event.
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