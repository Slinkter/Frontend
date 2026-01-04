import React from 'react';
import { TodoIcon } from './';

/**
 * Icono específico para marcar tareas como completadas.
 * Cambia de color a verde cuando la tarea está 'completed'.
 * 
 * @param {Object} props - Propiedades.
 * @param {boolean} props.completed - Estado de la tarea.
 * @param {Function} props.onComplete - Función al hacer click.
 * @returns {JSX.Element} Icono Check.
 */
function CompleteIcon({ completed, onComplete }) {
  return (
    <TodoIcon
      type="check"
      color={completed ? '#4caf50' : 'gray'}
      onClick={onComplete}
    />
  );
}

export { CompleteIcon };
