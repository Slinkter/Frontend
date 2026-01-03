import React from 'react';
import './CreateTodoButton.css';

/**
 * A functional component that renders a button to create new TODOs.
 * When clicked, it toggles the visibility of the TODO creation modal.
 *
 * @param {object} props The component's properties.
 * @param {function(boolean): void} props.setOpenModal A function to set the state of the modal's visibility.
 * @returns {React.ReactElement} The rendered button.
 */
function CreateTodoButton(props) {
  /**
   * Handles the click event for the button.
   * Toggles the `openModal` state by passing the previous state to `setOpenModal`.
   */
  const onClickButton = () => {
    props.setOpenModal(prevState => !prevState);
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