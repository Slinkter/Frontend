import React from "react";
import { TodoContext } from "../Context/TodoContext";
import { useState } from "react";

const TodoForm = () => {
    const { setOpenModal, addTodo } = React.useContext(TodoContext);
    const [text, setText] = useState("");

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addTodo(text);
        setOpenModal(false);
        setText("");
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="New Todo"
                    value={text}
                    onChange={handleChange}
                />
                <button type="submit">ADD TODO</button>
                <button type="button" onClick={handleCancel}>
                    CANCEL
                </button>
            </form>
        </div>
    );
};

export default TodoForm;
