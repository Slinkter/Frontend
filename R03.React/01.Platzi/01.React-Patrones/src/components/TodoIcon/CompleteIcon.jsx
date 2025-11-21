import React from "react";
import { TodoIcon } from ".";

/**
 * @file CompleteIcon.jsx
 * @description An icon for completing a TODO item. It changes color based on the `completed` state.
 * @param {object} props - The component props.
 * @param {boolean} props.completed - Whether the TODO item is completed.
 * @param {function} props.onComplete - The function to call when the icon is clicked.
 * @returns {JSX.Element} - The CompleteIcon component.
 */
function CompleteIcon({ completed, onComplete }) {
  return (
    <TodoIcon
      type="check"
      color={completed ? "#4caf50" : "gray"} // Green if completed, gray otherwise
      onClick={onComplete}
    />
  );
}

export { CompleteIcon };

