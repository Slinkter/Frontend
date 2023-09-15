import React from "react";
import { useState } from "react";
import { useReducer } from "react";

const types = {
    add: "add",
    update: "update",
    delete: "delete",
};

const initialTodos = [
    {
        id: 1,
        title: "todo #1",
    },
];

const reducer = (state, action) => {
    switch (action.type) {
        case types.add:
            return [...state, action.payload];
        case types.update:
            return state.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
        case types.delete:
            return state.filter((item) => item.id !== action.payload);
        default:
            return state;
    }
};

const TodoApp = () => {
    //
    const [state, dispatch] = useReducer(reducer, initialTodos);
    const [text, setText] = useState("");
    //
    const handleBtnDelete = (todo) =>
        dispatch({
            type: types.delete,
            payload: todo.id,
        });
    //
    const handleBtnUpdate = (todo) =>
        dispatch({
            type: types.update,
            payload: { ...todo, title: text },
        });
    //
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const newTodo = { id: Date.now(), title: text };
        dispatch({ type: types.add, payload: newTodo });
    };
    //
    return (
        <div>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                />
                <button type="submit"> add</button>
            </form>

            <ul>
                {state.map((todo) => (
                    <li key={todo.id}>
                        {todo.title}

                        <button onClick={() => handleBtnDelete(todo)}>
                            delete
                        </button>
                        <button onClick={() => handleBtnUpdate(todo)}>
                            update
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
