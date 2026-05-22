import React from "react";
import "./TodoSearch.css";

/**
 * A functional component that renders a search input field for TODOs.
 */
function TodoSearch({ searchValue, setSearchValue, isLoading }) {
    /**
     * Event Handler: Notifica al estado global el cambio en la búsqueda
     */
    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <input
            className="TodoSearch"
            placeholder="Cebolla"
            value={searchValue}
            onChange={handleSearchValueChange}
            disabled={isLoading}
        />
    );
}

export { TodoSearch };
