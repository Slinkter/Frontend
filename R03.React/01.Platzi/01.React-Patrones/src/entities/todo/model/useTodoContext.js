import React from "react";
import { TodoContext } from "./TodoContext";

/**
 * @file useTodoContext.js
 * @description Hook para consumir el TodoContext.
 */

/**
 * Hook personalizado para consumir el TodoContext de forma segura.
 * @returns {object} El valor actual del TodoContext.
 * @throws {Error} Si se usa fuera de un TodoProvider.
 */
function useTodoContext() {
    const context = React.useContext(TodoContext);
    if (!context) {
        throw new Error(
            "useTodoContext debe ser usado dentro de un TodoProvider",
        );
    }
    return context;
}

export { useTodoContext };
