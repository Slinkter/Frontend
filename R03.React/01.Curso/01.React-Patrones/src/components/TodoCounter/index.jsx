import React from 'react';
import { TodoContext } from '../TodoContext/index.jsx';
import './TodoCounter.css';

/**
 * @file TodoCounter.jsx
 * @description Displays the number of completed and total TODOs.
 * @returns {JSX.Element} - The TodoCounter component.
 */

function TodoCounter() {
  const { totalTodos, completedTodos } = React.useContext(TodoContext);
  return (
    <h2
      className={`TodoCounter`}
    >
      Has completado {completedTodos} de {totalTodos} TODOs
    </h2>
  );
}

export { TodoCounter };


