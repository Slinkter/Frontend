import React from "react";
import { useNavigate } from "react-router-dom";
import "./TodoForm.css";

function TodoForm(props) {
    const [newTodoValue, setNewTodoValue] = React.useState(
        "" || props.defaultTodoText
    );
    const navigate = useNavigate();

    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        navigate("/");
        props.submitEvent(newTodoValue);
    };
    const onCancel = () => {
        navigate("/");
        /*   setOpenModal(false); */
    };

    return (
        <form onSubmit={onSubmit}>
            <label>{[props.label]}</label>
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
                    {props.submitText}
                </button>
            </div>
        </form>
    );
}

export { TodoForm };
