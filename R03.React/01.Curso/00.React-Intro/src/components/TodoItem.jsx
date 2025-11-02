import React from "react";
import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";

const TodoItem = (props) => {
    const { editTodo, deleteTodo } = useContext(TodoContext);
    return (
        <div
            style={{
                display: "flex",
                flexBasis: "row",
                flexGrow: 1,
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                border: "1px solid #d1d5d9",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "8px",
                width: "100%",
            }}
        >
            <p style={{ color: "none", background: "none" }}>{props.text}</p>
            <button onClick={() => editTodo(props.text)}>Check</button>
            <button onClick={() => deleteTodo(props.text)}>Delete</button>
        </div>
    );
};

export default TodoItem;
