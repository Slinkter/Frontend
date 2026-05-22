import React from "react";
import { useTodos } from "./useTodos";
import { TodoContext } from "./TodoContext";

/**
 * @file TodoProvider.jsx
 * @description Proveedor que gestiona el estado y las funciones relacionadas con los TODOs.
 */

/**
 * Proveedor del contexto de TODOs.
 * @param {object} props - Propiedades del componente.
 * @returns {JSX.Element}
 */
function TodoProvider({ children }) {
    const todoValues = useTodos();

    return (
        <TodoContext.Provider value={todoValues}>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoProvider };
