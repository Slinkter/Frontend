import React from 'react';
import { CompleteIcon } from '../TodoIcon/CompleteIcon';
import { DeleteIcon } from '../TodoIcon/DeleteIcon';
import './TodoItem.css';

/**
 * @file TodoItem.jsx
 * @description Displays a single TODO item with its text and action buttons.
 * @param {object} props - The component props.
 * @param {string} props.text - The text of the TODO item.
 * @param {boolean} props.completed - Whether the TODO item is completed.
 * @param {function} props.onComplete - The function to call when the complete icon is clicked.
 * @param {function} props.onDelete - The function to call when the delete icon is clicked.
 * @returns {JSX.Element} - The TodoItem component.
 */
function TodoItem(props) {
  return (
    <li className="TodoItem">
      <CompleteIcon
        completed={props.completed}
        onComplete={props.onComplete}
      />
      <p
        className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}
      >
        {props.text}
      </p>
      <DeleteIcon
        onDelete={props.onDelete}
      />
    </li>
  );
}

export { TodoItem };

