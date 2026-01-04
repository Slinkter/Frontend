import React from "react";
import "../../styles/TodoCounter.css";

/**
 * Muestra el progreso de tareas completadas vs totales.
 * Renderiza dinámicamente un elemento H2 con estilos condicionales si está cargando.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.totalTodos - Cantidad total de tareas.
 * @param {number} props.completedTodos - Cantidad de tareas completadas.
 * @param {boolean} props.loading - Estado de carga para animación visual.
 * @returns {JSX.Element} Título con contador.
 */
function TodoCounter({ totalTodos, completedTodos, loading }) {
    return React.createElement('h2', {
        className: `TodoCounter ${!!loading && "TodoCounter--loading"}`
    }, `Has completado ${completedTodos} de ${totalTodos} TODOs`);
}

export { TodoCounter };