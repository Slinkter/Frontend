import React from "react";
import "./TodoItem.css";

function TodoItem(props) {
  return (
    <li className="TodoItem">
      <span
        onClick={props.onUpdateItem}
        className={`Icon Icon-check ${
          props.completed && "Icon-check--active"
        }   `}
      >
        C
      </span>
      <p
        className={`TodoItem-p  ${props.completed && "TodoItem-p--complete"}  `}
      >
        {props.text}
      </p>

      <span onClick={props.onDeleteItem} className={`Icon Icon-delete`}>
        X
      </span>
    </li>
  );
}

export { TodoItem };
