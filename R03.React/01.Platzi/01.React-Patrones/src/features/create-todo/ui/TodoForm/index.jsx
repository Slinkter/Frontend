import React from 'react';
import { useTodoContext } from '@/entities/todo';
import './TodoForm.css';

/**
 * @file TodoForm.jsx
 * @description Formulario para añadir nuevos TODOs. Se muestra dentro de un modal.
 * @returns {JSX.Element} - El componente TodoForm.
 */
function TodoForm() {
  const [newTodoValue, setNewTodoValue] = React.useState('');
  const { addTodo, setOpenModal } = useTodoContext();

  const f_onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  const f_onCancel = () => {
    setOpenModal(false);
  };

  const f_onSubmit = (event) => {
    event.preventDefault();
    if (newTodoValue.trim().length <= 0) return;
    addTodo(newTodoValue);
    setOpenModal(false);
  };

  return (
    <form onSubmit={f_onSubmit}>
      <label>Escribe tu nuevo TODO</label>
      <textarea
        value={newTodoValue}
        onChange={f_onChange}
        placeholder="Cortar la cebolla para el almuerzo"
      />
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={f_onCancel}
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
