import React from 'react';
import { TodoContext } from '../TodoContext/index.jsx';
import './CreateTodoButton.css';

/**
 * @file CreateTodoButton.jsx
 * @description Button for creating new TODOs.
 * @returns {JSX.Element} - The CreateTodoButton component.
 */

function CreateTodoButton() {
  const { setOpenModal } = React.useContext(TodoContext);
  const onClickButton = () => {
    setOpenModal(prevState => !prevState);
  };

  return (
    <button
      className="CreateTodoButton"
      onClick={onClickButton}
    >
      +
    </button>
  );
}

export { CreateTodoButton };


