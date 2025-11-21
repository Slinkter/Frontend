import React from 'react';
import { TodoContext } from '../TodoContext/index.jsx';
import './TodoForm.css';

/**
 * @file TodoForm.jsx
 * @description A form for adding new TODOs. It is displayed inside a modal.
 * @returns {JSX.Element} - The TodoForm component.
 */
function TodoForm() {
  // Local state to manage the value of the textarea
  const [newTodoValue, setNewTodoValue] = React.useState('');
  // Consume the context to get the functions to add a TODO and close the modal
  const { addTodo, setOpenModal } = React.useContext(TodoContext);

  /**
   * Handles the change event on the textarea.
   * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event.
   */
  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  /**
   * Handles the click event on the cancel button.
   * Closes the modal without adding a TODO.
   */
  const onCancel = () => {
    setOpenModal(false);
  };

  /**
   * Handles the form submission.
   * Adds the new TODO and closes the modal.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const onSubmit = (event) => {
    event.preventDefault();
    addTodo(newTodoValue);
    setOpenModal(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Escribe tu nuevo TODO</label>
      <textarea
        value={newTodoValue}
        onChange={onChange}
        placeholder="Cortar la cebolla oara el almuerzo"
      />
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
          >
          Cancelar
        </button>
        <button
          type="submit"
          className="TodoForm-button TodoForm-button--add"
        >
          Añadir
        </button>
      </div>
    </form>
  );
}

export { TodoForm };


