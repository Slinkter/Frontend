import React from "react";
import "./TodoList.css";

/**
 * @file TodoList.jsx
 * @description A container that displays a list of TODOs.
 * It renders the children passed to it, which are typically `TodoItem` components.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components (e.g., TodoItems) to be rendered within the list.
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
