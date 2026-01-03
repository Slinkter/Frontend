import React from "react";
import "../style/TodoList.css";

/**
 * A container component for the list of TODO items.
 * It renders a `<ul>` list with the children passed to it.
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the list,
 * typically a list of `TodoItem` components or loading/error messages.
 * @returns {JSX.Element} The list container component.
 */
function TodoList(props) {
    return (
        <section>
            <ul>{props.children}</ul>
        </section>
    );
}

export { TodoList };
