import React from "react";
import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const { renderList } = useContext(TodoContext);

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            {renderList.map((item) => TodoItem({ ...item, key: item.text }))}
        </div>
    );
};

export default TodoList;
