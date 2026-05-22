import React from 'react';
import { useTodoContext } from '@/entities/todo';
import './CreateTodoButton.css';

/**
 * @file CreateTodoButton.jsx
 * @description A floating button that opens a modal to create a new TODO.
 * @returns {JSX.Element} - El botón para crear un nuevo TODO.
 */
function CreateTodoButton() {
  // Consume el contexto mediante un hook personalizado
  const { setOpenModal } = useTodoContext();

  const f_onClickButton = () => {
    setOpenModal(prevState => !prevState);
  };

  return (
    <button
      className="CreateTodoButton"
      onClick={f_onClickButton}
    >
      +
    </button>
  );
}

export { CreateTodoButton };
