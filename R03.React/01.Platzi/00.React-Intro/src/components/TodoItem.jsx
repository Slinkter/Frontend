import React from "react";
import "../style/TodoItem.css";

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
