import React from "react";
import { useReducer, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const types = {
    ADD: "ADD",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
};

const initialState = [
    { id: 1, task: "tarea 1 : comprar pan" },
    { id: 2, task: "tarea 2 : comprar cafe" },
];

const reducer = (state, action) => {
    switch (action.type) {
        case types.ADD:
            return [...state, action.payload];
        case types.UPDATE:
            return state.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo
            );
        case types.DELETE:
            return state.filter((todo) => todo.id !== action.payload.id);
        default:
            return state;
    }
};

const TodoApp = () => {
    const [text, setText] = useState("");
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleAddTodo = (e) => {
        e.preventDefault();
        const newTodo = { id: Date.now(), task: text };
        dispatch({ type: types.ADD, payload: newTodo });
        setText("");
    };

    const handleUpdate = (todo) => {
        const newTodo = { ...todo, task: text };
        dispatch({ type: types.UPDATE, payload: newTodo });
        setText("");
    };

    const handleDelete = (todo) => {
        dispatch({ type: types.DELETE, payload: todo });
    };

    return (
        <div className="border-2 w-3/4 flex flex-col justify-center items-center p-4 bg-gray-100 rounded-lg shadow-lg">
            <form onSubmit={handleAddTodo} className="flex w-full mb-4">
                <input
                    className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Ingresa un TODO"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
                >
                    <FaPlus />
                </button>
            </form>
            <ul className="w-full">
                {state.map((todo) => (
                    <li
                        key={todo.id}
                        className="bg-white rounded-lg p-4 mb-2 flex justify-between items-center shadow-md transition transform hover:scale-105"
                    >
                        <h1 className="text-lg text-gray-800">{todo.task}</h1>
                        <div className="flex gap-2">
                            <button
                                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-300"
                                onClick={() => handleUpdate(todo)}
                            >
                                <FaEdit />
                            </button>
                            <button
                                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
                                onClick={() => handleDelete(todo)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
