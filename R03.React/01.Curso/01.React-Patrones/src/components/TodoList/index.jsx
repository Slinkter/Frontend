import React from "react";
import "./TodoList.css";

/**
 * @file TodoList.jsx
 * @description Displays a list of TODOs.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components (TodoItems) to be rendered within the list.
 * @returns {JSX.Element} - The TodoList component.
 */

function TodoList(props) {
  return (
    <section className="TodoList-container">
      <ul>{props.children}</ul>
    </section>
  );
}

export { TodoList };



