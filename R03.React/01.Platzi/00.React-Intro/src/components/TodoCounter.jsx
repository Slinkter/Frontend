/**
 * @file TodoCounter.jsx
 * @description Componente de cabecera que muestra el progreso de las tareas completadas.
 * @module components
 */

import React, { useContext } from "react";
import { TodoContext } from "../context/customContext.jsx";
import "../style/TodoCounter.css";

/**
 * Componente que muestra el recuento de TODOs completados y totales.
 * @returns {JSX.Element} El contador de progreso.
 */
const TodoCounter = () => {
    const { totalTodos, completedTodos } = useContext(TodoContext);

    return (
        <h2 className="TodoCounterh2">
            Has completado {completedTodos} de {totalTodos} TODOs
        </h2>
    );
};

export { TodoCounter };
