/**
 * @file A container component for rendering a list of items.
 * @description `TodoList` serves as a structural component that wraps the list of TODOs.
 * It uses the `children` prop, a core concept in React's composition model, to render
 * whatever is passed inside it. This makes the component highly reusable, as it is not
 * directly coupled to the items it will contain (e.g., `TodoItem`, `TodosLoading`, `TodosError`).
 * This pattern allows for great flexibility and separation of concerns.
 */

import React from "react";
import "./TodoList.css";

/**
 * A container component that displays a list of items.
 * It acts as a wrapper and renders any children passed to it inside a `<ul>` element.
 *
 * @param {object} props The properties for the component.
 * @param {React.ReactNode} props.children The elements to be rendered inside the list.
 * This can be anything from `TodoItem` components to loading or error indicators.
 * @returns {JSX.Element} A `<section>` element containing a `<ul>` that wraps the children.
 */
function TodoList(props) {
    return (
        <section className="TodoList-container">
            <ul>{props.children}</ul>
        </section>
    );
}

export { TodoList };