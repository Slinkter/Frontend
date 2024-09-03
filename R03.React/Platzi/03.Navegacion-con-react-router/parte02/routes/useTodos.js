import React from "react";
import { useLocalStorage } from "./useLocalStorage";

function useTodos() {
    const {
        item: data,
        saveItem: saveTodos,
        sincronizeItem: sincronizeTodos,
        loading,
        error,
    } = useLocalStorage("TODOS_V2", []);
    //-->
    const completedTodos = data.filter((todo) => !!todo.completed).length;
    const totalTodos = data.length;
    // -->
    const [searchValue, setSearchValue] = React.useState("");

    let searchedTodos = [];

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
        const id = Date.now();
        const newTodos = [...data];

        newTodos.push({
            completed: false,
            text,
            id,
        });

        saveTodos(newTodos);
    };

    const completeTodo = (id) => {
        const todoIndex = data.findIndex((todo) => todo.id === id); // number or -1
        const newTodos = [...data];
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };

    const editTodo = (id, newText) => {
        const todoIndex = data.findIndex((todo) => todo.id === id);
        const newTodos = [...data];
        newTodos[todoIndex].text = newText;
        saveTodos(newTodos);
    };

    const deleteTodo = (id) => {
        const todoIndex = data.findIndex((todo) => todo.id === id);
        const newTodos = [...data];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    //

    const getTodo = (id) => {
        const todoIndex = data.findIndex((todo) => todo.id === id);
        return data[todoIndex];
    };

    const state = {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        searchedTodos,
        getTodo,
    };

    const stateUpdaters = {
        setSearchValue,
        addTodo,
        completeTodo,
        editTodo,
        deleteTodo,
        sincronizeTodos,
    };

    return { state, stateUpdaters };
}

export { useTodos };
