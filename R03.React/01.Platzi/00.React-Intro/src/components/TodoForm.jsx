import React from "react";
import { TodoContext } from "../context/customContext.jsx";
import "../style/TodoForm.css";
import { useContext } from "react";

/**
 * Component that renders a form for adding new TODO items.
 * It handles its own state for the new TODO's text and uses the `TodoContext`
 * to add the new TODO and close the modal.
 * @returns {JSX.Element} A form element for creating TODOs.
 */
function TodoForm() {
    const [newTodoValue, setNewTodoValue] = React.useState("");
    const { addTodo, setOpenModal } = useContext(TodoContext);

    /**
     * Handles the change event of the textarea to update the new TODO's text.
     * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The change event object.
     */
    const onChange = (e) => {
        setNewTodoValue(e.target.value);
    };

    /**
     * Handles the click event on the cancel button, closing the modal.
     */
    const onCancel = () => {
        setOpenModal(false);
    };

    /**
     * Handles the form submission, adding the new TODO and closing the modal.
     * @param {React.FormEvent<HTMLFormElement>} e - The form event object.
     */
    const onSubmit = (e) => {
        e.preventDefault();
        addTodo(newTodoValue);
        setOpenModal(false);
    };

    return (
        <form onSubmit={onSubmit}>
            <label>Escribe tu nuevo Todo</label>
            <textarea
                value={newTodoValue}
                onChange={onChange}
                placeholder="escribe algo"
            />

            <div className="TodoForm-buttonContainer">
                <button
                    type="button"
                    onClick={onCancel}
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
}

export { TodoForm };
