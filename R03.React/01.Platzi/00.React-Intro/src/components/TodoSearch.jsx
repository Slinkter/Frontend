import React from "react";
import { TodoContext } from "../context/customContext.jsx";
import "../style/TodoSearch.css";

/**
 * Component that provides an input field for users to filter the TODO list.
 * It consumes the search state from the `TodoContext`.
 * @returns {JSX.Element} The search input component.
 */
function TodoSearch() {
    const { stateSearch, setStateSearch } = React.useContext(TodoContext);

    /**
     * Event handler for the input's onChange event.
     * Updates the search state in the context.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
     */
    const onSearchValueChange = (e) => {
        setStateSearch(e.target.value);
    };

    return (
        <input
            className="TodoSearch"
            placeholder="ingresar un valor"
            value={stateSearch}
            onChange={onSearchValueChange}
        />
    );
}

export { TodoSearch };
