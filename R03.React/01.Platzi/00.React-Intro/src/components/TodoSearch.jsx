/**
 * @file TodoSearch.jsx
 * @description Input component for filtering tasks by text content.
 * @module components
 */

import React, { useContext } from "react";
import { TodoContext } from "../context/customContext.jsx";
import "../style/TodoSearch.css";

/**
 * Component providing a search interface to filter the task list.
 * @returns {JSX.Element} The rendered search input.
 */
const TodoSearch = () => {
    const { searchValue, setSearchValue } = useContext(TodoContext);

    /**
     * Updates the global search state based on user input.
     * @param {React.ChangeEvent<HTMLInputElement>} event - DOM event.
     */
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <input
            className="TodoSearch"
            placeholder="Buscar un TODO..."
            value={searchValue}
            onChange={handleSearchChange}
            aria-label="Search TODOs"
        />
    );
};

export { TodoSearch };
