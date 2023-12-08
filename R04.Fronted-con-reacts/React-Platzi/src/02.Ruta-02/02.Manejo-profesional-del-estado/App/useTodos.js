import React from "react";
import { useLocalStorage } from "./useLocalStorage";

function useTodos() {
    // importar
    const {
        item: todos, // array
        saveItem: saveTodos, // funcion
        sincronizeItem: sincronizeTodos, // funcion
        loading, // booleando
        error, // boolenado
    } = useLocalStorage("TODOS_V1", []);

    const completedTodos = todos.filter((todo) => !!todo.completed).length; // number
    const totalTodos = todos.length; // number

    let searchedTodos = []; // lista de Todo
    //
    const [searchValue, setSearchValue] = React.useState(""); // String
    const [openModal, setOpenModal] = React.useState(false); // booleando
    //
    if (!searchValue.length >= 1) {
        searchedTodos = todos;
    } else {
        searchedTodos = todos.filter((todo) => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        });
    }

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            completed: false,
            text,
        });
        saveTodos(newTodos);
    };

    const completeTodo = (text) => {
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    const state = {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        searchedTodos,
        openModal,
    };

    const stateUpdaters = {
        setSearchValue,
        addTodo,
        completeTodo,
        deleteTodo,
        setOpenModal,
        sincronizeTodos,
    };

    return { state, stateUpdaters };
}

export { useTodos };
