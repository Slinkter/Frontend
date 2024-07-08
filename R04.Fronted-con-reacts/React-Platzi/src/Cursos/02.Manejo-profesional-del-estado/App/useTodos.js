import React from "react";
// Custom hooks
import { useLocalStorage } from "./useLocalStorage";

function useTodos() {
    // importar
    const {
        item: data, // array
        saveItem: saveTodos, // funcion
        sincronizeItem: sincronizeTodos, // funcion
        loading, // booleando
        error, // boolenado
    } = useLocalStorage("TODOS_V1", []);

    const completedTodos = data.filter((todo) => !!todo.completed).length; // number
    const totalTodos = data.length; // number

    let searchedTodos = []; // lista de Todo
    //
    const [searchValue, setSearchValue] = React.useState(""); // String
    const [openModal, setOpenModal] = React.useState(false); // booleando
    //
    if (!searchValue.length >= 1) {
        searchedTodos = data;
    } else {
        searchedTodos = data.filter((todo) => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        });
    }

    const addTodo = (text) => {
        const newTodos = [...data];
        newTodos.push({
            completed: false,
            text,
        });
        saveTodos(newTodos);
    };

    const completeTodo = (text) => {
        const todoIndex = data.findIndex((todo) => todo.text === text);
        const newTodos = [...data];
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const todoIndex = data.findIndex((todo) => todo.text === text);
        const newTodos = [...data];
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
