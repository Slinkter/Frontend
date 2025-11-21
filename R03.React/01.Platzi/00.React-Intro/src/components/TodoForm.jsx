import React from "react";
import { TodoContext } from "../context/customContext.jsx";
import "../style/TodoForm.css";

function TodoForm() {
    const [newTodoValue, setNewTodoValue] = React.useState("");
    const { addTodo, setOpenModal } = React.useContext(TodoContext);

    const onChange = (e) => {
        setNewTodoValue(e.target.value);
    };

    const onCancel = () => {
        setOpenModal(false);
    };

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
                    type="submit"
                    className="Todo-Form-button TodoForm-button--add"
                >
                    Agregar
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="Todo-Form-button TodoForm-button--cancel"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export { TodoForm };
