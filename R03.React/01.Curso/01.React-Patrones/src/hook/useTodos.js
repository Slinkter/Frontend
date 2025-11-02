import React from "react";
import { useLocalStorage } from "../hook/useLocalStorage";

/**
 * @file useTodos.js
 * @description Custom hook for managing the entire state and logic .
 * @returns {object} - The state and functions for managing TODOs.
 */
function useTodos() {
    const [searchValue, setSearchValue] = React.useState(""); // State for the search input value
    const [openModal, setOpenModal] = React.useState(false); // State to control the modal visibility

    // Use the useLocalStorage hook to persist TODOs
    const {
        loading,
        error,
        item: todos,
        saveItem: saveTodos,
        sincronizeItem: sincronizeTodos,
    } = useLocalStorage("TODOS_V1", []);

    // Derived state: count of completed TODOs
    const completedTodos = todos.filter((todo) => todo.completed).length;
    // Derived state: total number of TODOs
    const totalTodos = todos.length;

    // Derived state: filter TODOs based on the search value
    const searchedTodos = !searchValue.length
        ? todos
        : todos.filter((todo) => {
              const todoText = todo.text.toLowerCase();
              const searchText = searchValue.toLowerCase();
              return todoText.includes(searchText);
          });

    /**
     * Adds a new TODO to the list.
     * @param {string} text - The text of the new TODO.
     */
    const addTodo = (text) => {
        const newTodos = [...todos, { text, completed: false }];
        saveTodos(newTodos);
    };

    /**
     * Marks a TODO as completed.
     * @param {string} text - The text of the TODO to complete.
     */
    const completeTodo = (text) => {
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };

    /**
     * Deletes a TODO from the list.
     * @param {string} text - The text of the TODO to delete.
     */
    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    return {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        addTodo,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        sincronizeTodos,
    };
}

export { useTodos };
