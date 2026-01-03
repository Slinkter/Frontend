import React from 'react';
import './TodoCounter.css';

/**
 * A functional component that displays the current progress of TODOs.
 * It shows how many TODOs have been completed out of the total number of TODOs.
 *
 * @param {object} props The component's properties.
 * @param {number} props.total The total number of TODOs.
 * @param {number} props.completed The number of completed TODOs.
 * @returns {React.ReactElement} The rendered TODO counter.
 */
function TodoCounter({ total, completed }) {
  return (
    <h2 className="TodoCounter">Has completado {completed} de {total} TODOs</h2>
  );
}

export { TodoCounter };