import React from "react";
import { TodoIcon } from "./";

/**
 * Icono específico para editar tareas.
 * Navega a la página de edición al hacer click.
 * 
 * @param {Object} props - Propiedades.
 * @param {Function} props.onEdit - Función al hacer click.
 * @returns {JSX.Element} Icono Lápiz.
 */
function EditIcon({ onEdit }) {
    return <TodoIcon type="edit" onClick={onEdit} />;
}

export { EditIcon };
