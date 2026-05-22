import React, { useState } from "react";
import "./TodoForm.css";

/**
 * A functional component that renders a form for adding new TODOs.
 */
function TodoForm({ addTodo, setIsOpenModal }) {
    // Estado Local: Maneja el texto de la nueva tarea (Controlled Input)
    const [newTodoValue, setNewTodoValue] = useState("");

    /**
     * Event Handler: Sincroniza el valor del textarea con el estado local
     */
    const handleChange = (event) => {
        setNewTodoValue(event.target.value);
    };

    /**
     * Event Handler: Cierra el modal sin realizar acciones
     */
    const handleCancel = () => {
        setIsOpenModal(false);
    };

    /**
     * Event Handler: Valida y procesa el envío del formulario
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedValue = newTodoValue.trim();
        // Validación: Solo añade si el texto no está vacío tras limpiar espacios
        if (trimmedValue.length > 0) {
            addTodo(trimmedValue);
            setIsOpenModal(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Escribe tu nuevo TODO</label>
            <textarea
                value={newTodoValue}
                onChange={handleChange}
                placeholder="Cortar la cebolla para el almuerzo"
            />
            <div className="TodoForm-buttonContainer">
                <button
                    type="button"
                    className="TodoForm-button TodoForm-button--cancel"
                    onClick={handleCancel}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="TodoForm-button TodoForm-button--add"
                    disabled={newTodoValue.trim().length === 0}
                >
                    Añadir
                </button>
            </div>
        </form>
    );
}

export { TodoForm };
