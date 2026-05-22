/**
 * @file A presentational component representing a single TODO item.
 */

import React from "react";
import { CompleteIcon, DeleteIcon } from "@/shared/ui";
import "./TodoItem.css";

/**
 * Renders a single TODO item, including its text and action icons.
 *
 * @param {object} props The properties for the component.
 * @param {string} props.text The text content of the TODO item.
 * @param {boolean} props.completed The completion status of the TODO.
 * @param {function} props.onComplete A callback function to be executed when the complete icon is clicked.
 * @param {function} props.onDelete A callback function to be executed when the delete icon is clicked.
 * @returns {JSX.Element} A `<li>` element representing the TODO item.
 */
function TodoItem(props) {
    const f_onComplete = props.onComplete;
    const f_onDelete = props.onDelete;
    return (
        <li className="TodoItem">
            <CompleteIcon
                completed={props.completed}
                onComplete={f_onComplete}
            />
            <p
                // The CSS class changes based on the `completed` prop to apply different styles.
                className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}
            >
                {props.text}
            </p>
            <DeleteIcon onDelete={f_onDelete} />
        </li>
    );
}

export { TodoItem };
