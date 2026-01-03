/**
 * @file This custom hook centralizes the entire business logic and state management for the TODOs application.
 * @description `useTodos` is a high-level custom hook that acts as the "brain" of the application.
 * It encapsulates all state related to TODOs, search functionality, and modal visibility.
 * It leverages the `useLocalStorage` hook for data persistence and provides a clean API
 * (state values and action functions) to the rest of the application through the `TodoContext`.
 * This pattern follows the principle of Separation of Concerns, isolating the business logic
 * from the UI components.
 */

import React from "react";
import { useLocalStorage } from "../hook/useLocalStorage";

/**
 * Custom hook to manage the state and logic of the TODOs application.
 *
 * @returns {object} An object containing all the state and functions required by the application.
 * @property {boolean} loading - True if the TODOs are currently being loaded from storage.
 * @property {boolean} error - True if an error occurred while loading the TODOs.
 * @property {number} totalTodos - The total number of TODOs.
 * @property {number} completedTodos - The number of completed TODOs.
 * @property {string} searchValue - The current value of the search input.
 * @property {function} setSearchValue - Function to update the search value.
 * @property {Array<object>} searchedTodos - The list of TODOs filtered by the search value.
 * @property {function} addTodo - Function to add a new TODO to the list.
 * @property {function} completeTodo - Function to mark a TODO as completed.
 * @property {function} deleteTodo - Function to delete a TODO from the list.
 * @property {boolean} openModal - The current visibility state of the creation modal.
 * @property {function} setOpenModal - Function to toggle the modal's visibility.
 * @property {function} sincronizeTodos - Function to manually trigger a re-sync with localStorage.
 */
function useTodos() {
    // State for the search input value.
    const [searchValue, setSearchValue] = React.useState("");
    // State to control the modal's visibility for creating new TODOs.
    const [openModal, setOpenModal] = React.useState(false);

    // Use the `useLocalStorage` hook to persist TODOs.
    // This abstracts away the direct interaction with `localStorage`.
    const {
        loading,
        error,
        item: todos,
        saveItem: saveTodos,
        sincronizeItem: sincronizeTodos,
    } = useLocalStorage("TODOS_V1", []);

    // Derived state: The number of TODOs that have been marked as completed.
    const completedTodos = todos.filter((todo) => todo.completed).length;
    // Derived state: The total number of TODOs.
    const totalTodos = todos.length;

    // Derived state: A new array of TODOs filtered based on the `searchValue`.
    // The search is case-insensitive. If `searchValue` is empty, it returns all TODOs.
    const searchedTodos = !searchValue.length
        ? todos
        : todos.filter((todo) => {
              const todoText = todo.text.toLowerCase();
              const searchText = searchValue.toLowerCase();
              return todoText.includes(searchText);
          });

    /**
     * Adds a new TODO item to the list.
     * @param {string} text - The text content of the new TODO.
     */
    const addTodo = (text) => {
        const newTodos = [...todos, { text, completed: false }];
        saveTodos(newTodos); // Persist the new list.
    };

    /**
     * Marks a specific TODO item as completed.
     * @param {string} text - The text of the TODO to be marked as complete.
     */
    const completeTodo = (text) => {
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos); // Persist the updated list.
    };

    /**
     * Deletes a specific TODO item from the list.
     * @param {string} text - The text of the TODO to be deleted.
     */
    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos); // Persist the updated list.
    };

    // Expose the state and action functions to be used by the context provider.
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
