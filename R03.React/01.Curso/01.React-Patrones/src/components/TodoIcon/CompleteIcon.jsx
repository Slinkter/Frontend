import React from "react";
import { TodoIcon } from ".";

/**
 * @file CompleteIcon.jsx
 * @description Icon for completing a TODO item.
 * @param {object} props - The component props.
 * @param {boolean} props.completed - Whether the TODO item is completed.
 * @param {function} props.onComplete - The function to call when the icon is clicked.
 * @returns {JSX.Element} - The CompleteIcon component.
 */

function CompleteIcon({ completed, onComplete }) {
  return (
    <TodoIcon
      type="check"
      color={completed ? "#4caf50" : "gray"}
      onClick={onComplete}
    />
  );
}

export { CompleteIcon };

