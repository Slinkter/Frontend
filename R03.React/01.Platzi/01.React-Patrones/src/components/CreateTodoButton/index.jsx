import React from 'react';
import { TodoContext } from '../TodoContext/index.jsx';
import './CreateTodoButton.css';

/**
 * @file CreateTodoButton.jsx
 * @description A floating button that opens a modal to create a new TODO.
 * @returns {JSX.Element} - The CreateTodoButton component.
 */
function CreateTodoButton() {
  // Consume the context to get the modal state dispatcher
  const { setOpenModal } = React.useContext(TodoContext);

  /**
   * Handles the click event on the button.
   * Toggles the visibility of the modal.
   */
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


