/**
 * @file TodoForm.jsx
 * @description Componente de formulario para añadir nuevas tareas a la lista de TODOs.
 * @module components
 */

import React, { useState, useContext } from "react";
import { TodoContext } from "../context/customContext.jsx";
import "../style/TodoForm.css";

/**
 * Componente que proporciona una interfaz para crear nuevos ítems TODO.
 * @returns {JSX.Element} El formulario de creación de tareas.
 * @remarks 
 * - Gestiona el estado local del input para el texto del TODO.
 * - Dispara acciones del contexto para la persistencia y el cierre del modal.
 */
const TodoForm = () => {
    const [newTodoValue, setNewTodoValue] = useState("");
    const { addTodo, setIsModalOpen } = useContext(TodoContext);

    /**
     * Actualiza el estado local en los cambios del input de texto.
     * @param {React.ChangeEvent<HTMLTextAreaElement>} event - Evento del DOM.
     */
    const handleTextChange = (event) => {
        setNewTodoValue(event.target.value);
    };

    /**
     * Cierra el modal sin guardar los cambios.
     */
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    /**
     * Persiste el nuevo TODO y cierra el modal.
     * @param {React.FormEvent<HTMLFormElement>} event - Evento del DOM.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        if (newTodoValue.trim().length > 0) {
            addTodo(newTodoValue);
            setIsModalOpen(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="newTodo">Escribe tu nuevo Todo</label>
            <textarea
                id="newTodo"
                value={newTodoValue}
                onChange={handleTextChange}
                placeholder="escribe algo..."
                autoFocus
            />

            <div className="TodoForm-buttonContainer">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="Todo-Form-button TodoForm-button--cancel"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="Todo-Form-button TodoForm-button--add"
                >
                    Agregar
                </button>
            </div>
        </form>
    );
};

export { TodoForm };
