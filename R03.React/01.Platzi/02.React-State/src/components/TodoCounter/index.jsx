import React from "react";
import "./TodoCounter.css";

/**
 * A functional component that displays the current progress of TODOs.
 * It shows how many TODOs have been completed out of the total number of TODOs.
 *
 * @param {object} props The component's properties.
 * @param {number} props.totalTodos The total number of TODOs.
 * @param {number} props.completedTodos The number of completed TODOs.
 * @param {boolean} props.isLoading Indicates if the application is currently loading.
 * @returns {React.ReactElement} The rendered TODO counter.
 */
function TodoCounter({ totalTodos, completedTodos, isLoading }) {
    if (isLoading) {
        return <h2 className="TodoCounter TodoCounter--loading">Cargando TODOs...</h2>;
    }

    if (totalTodos === 0) {
        return <h2 className="TodoCounter">No tienes TODOs pendientes.</h2>;
    }

    return (
        <h2 className="TodoCounter">
            Has completado {completedTodos} de {totalTodos} TODOs
        </h2>
    );
}

export { TodoCounter };
