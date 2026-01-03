import React from 'react';
import './TodoList.css';

/**
 * A functional component that serves as a container for a list of TODO items.
 * It renders its children within a scrollable section.
 *
 * @param {object} props The component's properties.
 * @param {React.ReactNode} props.children The child elements to be rendered inside the list container (e.g., `TodoItem` components).
 * @returns {React.ReactElement} The rendered list container.
 */
function TodoList(props) {
  return (
    <section className="TodoList-container">
      {props.children}
    </section>
  );
}

export { TodoList };