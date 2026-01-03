import React from 'react';
import './TodoForm.css';

/**
 * A functional component that renders a form for adding new TODOs.
 * It manages the input value internally and calls provided functions to
 * add a new TODO or close the modal.
 *
 * @param {object} props The component's properties.
 * @param {function(string): void} props.addTodo A callback function to add a new TODO item.
 * @param {function(boolean): void} props.setOpenModal A callback function to control the visibility of the modal.
 * @returns {React.ReactElement} The rendered TODO form.
 */
function TodoForm({ addTodo, setOpenModal }) {
  /**
   * Manages the value of the new TODO text input.
   * @type {[string, function(string): void]}
   */
  const [newTodoValue, setNewTodoValue] = React.useState('');

  /**
   * Handles changes to the textarea input.
   * @param {React.ChangeEvent<HTMLTextAreaElement>} event The change event.
   */
  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  /**
   * Handles the click event for the cancel button.
   * Closes the modal without adding a TODO.
   */
  const onCancel = () => {
    setOpenModal(false);
  };

  /**
   * Handles the form submission event.
   * Prevents default form submission, calls `addTodo` with the new value,
   * and closes the modal.
   * @param {React.FormEvent<HTMLFormElement>} event The form submission event.
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
        placeholder="Cortar la cebolla para el almuerzo"
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