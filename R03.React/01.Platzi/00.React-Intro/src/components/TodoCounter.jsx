import React from "react";
import { TodoContext } from "../context/customContext.jsx";
import "../style/TodoCounter.css";

/**
 * Component that displays the number of completed and total TODOs.
 * @returns {JSX.Element} The counter component.
 */
function TodoCounter() {
    const { totalTodos, completedTodos } = React.useContext(TodoContext);

    return (
        <h2 className="TodoCounterh2">
            Has completado {completedTodos} de {totalTodos} TODOs{" "}
        </h2>
    );
}

export { TodoCounter };
