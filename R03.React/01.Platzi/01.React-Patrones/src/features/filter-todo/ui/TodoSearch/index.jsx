import React from "react";
import { useTodoContext } from "@/entities/todo";
import "./TodoSearch.css";

/**
 * @file TodoSearch.jsx
 * @description Componente que proporciona una entrada de búsqueda para filtrar la lista de TODOs.
 * @returns {JSX.Element} - El componente de búsqueda de TODOs.
 */
function TodoSearch() {
    // Consume el contexto mediante un hook personalizado
    const { searchValue, setSearchValue } = useTodoContext();

    const f_onSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <input
            className="TodoSearch"
            placeholder="Cebolla"
            value={searchValue}
            onChange={f_onSearchValueChange}
        />
    );
}

export { TodoSearch };
