/**
 * @file A presentational component representing a single TODO item.
 * @description This component is responsible for rendering the details of one TODO,
 * including its text and action buttons for completion and deletion.
 * It is a "dumb" component that receives all its data and behavior via props.
 * Its visual state (e.g., the crossed-out text for a completed TODO) is derived
 * directly from these props.
 */

import React from 'react';
import { CompleteIcon } from '../TodoIcon/CompleteIcon';
import { DeleteIcon } from '../TodoIcon/DeleteIcon';
import './TodoItem.css';

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
  return (
    <li className="TodoItem">
      <CompleteIcon
        completed={props.completed}
        onComplete={props.onComplete}
      />
      <p
        // The CSS class changes based on the `completed` prop to apply different styles.
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