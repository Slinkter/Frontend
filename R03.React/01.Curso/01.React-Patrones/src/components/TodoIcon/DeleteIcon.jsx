import React from "react";
import { TodoIcon } from ".";

/**
 * @file DeleteIcon.jsx
 * @description An icon for deleting a TODO item.
 * @param {object} props - The component props.
 * @param {function} props.onDelete - The function to call when the icon is clicked.
 * @returns {JSX.Element} - The DeleteIcon component.
 */
function DeleteIcon({ onDelete }) {
  return (
    <TodoIcon 
      type="delete" 
      onClick={onDelete} 
    />
  );
}

export { DeleteIcon };

