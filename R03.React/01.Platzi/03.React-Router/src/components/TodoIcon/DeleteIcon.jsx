import React from 'react';
import { TodoIcon } from './';

/**
 * Icono específico para eliminar tareas.
 * Siempre se muestra en gris por defecto.
 * 
 * @param {Object} props - Propiedades.
 * @param {Function} props.onDelete - Función al hacer click.
 * @returns {JSX.Element} Icono Papelera/X.
 */
function DeleteIcon({ onDelete }) {
  return (
    <TodoIcon
      type="delete"
      onClick={onDelete}
    />
  );
}

export { DeleteIcon };
