/**
 * @file TodoItem.jsx
 * @description Componente de ítem de lista para mostrar tareas individuales.
 * @module components
 */

import React from "react";
import "../style/TodoItem.css";

/**
 * Componente que representa una única tarea en la lista de TODOs.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.text - Descripción de la tarea.
 * @param {boolean} props.completed - Estado de completado.
 * @param {Function} props.onComplete - Callback cuando la tarea se marca como hecha.
 * @param {Function} props.onDelete - Callback cuando se elimina la tarea.
 * @returns {JSX.Element} El ítem de lista renderizado.
 */
const TodoItem = ({ text, completed, onComplete, onDelete }) => {
    return (
        <li className="TodoItem">
            <span
                className={`Icon Icon-check ${
                    completed ? "Icon-check--active" : ""
                }`}
                onClick={onComplete}
                role="button"
                aria-label={completed ? "Tarea completada" : "Completar tarea"}
            >
                C
            </span>
            <p className={`TodoItem-p ${completed ? "TodoItem-p--complete" : ""}`}>
                {text}
            </p>
            <span 
                className="Icon Icon-delete" 
                onClick={onDelete}
                role="button"
                aria-label="Eliminar tarea"
            >
                X
            </span>
        </li>
    );
};

export { TodoItem };
