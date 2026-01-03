import React from "react";
import "../style/TodoItem.css";

/**
 * Component that represents a single TODO item in the list.
 * @param {object} props - The props for the component.
 * @param {string} props.text - The text content of the TODO item.
 * @param {boolean} props.completed - The completion status of the TODO item.
 * @param {() => void} props.onUpdateItem - Function to call when the item is marked as complete.
 * @param {() => void} props.onDeleteItem - Function to call when the item is deleted.
 * @returns {JSX.Element} A list item element representing a TODO.
 */
function TodoItem({ text, completed, onUpdateItem, onDeleteItem }) {
    return (
        <li className="TodoItem">
            <span
                className={`Icon Icon-check ${
                    completed && "Icon-check--active"
                }`}
                onClick={onUpdateItem}
            >
                C
            </span>
            <p className={`TodoItem-p ${completed && "TodoItem-p--complete"}`}>
                {text}
            </p>
            <span className="Icon Icon-delete" onClick={onDeleteItem}>
                X
            </span>
        </li>
    );
}

export { TodoItem };
