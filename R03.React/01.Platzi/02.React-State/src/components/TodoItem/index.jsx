import React from "react";
import { CompleteIcon } from "../TodoIcon/CompleteIcon.jsx";
import { DeleteIcon } from "../TodoIcon/DeleteIcon.jsx";
import "./TodoItem.css";

/**
 * A functional component that renders a single TODO item.
 * It displays the TODO text, its completion status, and provides
 * actions to mark as complete or delete.
 *
 * @param {object} props The component's properties.
 * @param {string} props.text The text content of the TODO item.
 * @param {boolean} props.completed The completion status of the TODO item.
 * @param {function(): void} props.onComplete A callback function to be called when the TODO is marked as complete.
 * @param {function(): void} props.onDelete A callback function to be called when the TODO is deleted.
 * @returns {React.ReactElement} The rendered TODO item.
 */
function TodoItem(props) {
    return (
        <li className="TodoItem">
            <CompleteIcon
                completed={props.completed}
                onComplete={props.onComplete}
            />
            <p
                className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}
            >
                {props.text}
            </p>
            <DeleteIcon onDelete={props.onDelete} />
        </li>
    );
}

export { TodoItem };
