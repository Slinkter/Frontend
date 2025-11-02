import React from "react";
import { useLocalStorage } from "../hook/useLocalStorage";

/**
 * @file useTodos.js
 * @description Custom hook for managing TODOs.
 * @returns {object} - The state and functions for managing TODOs.
 */

function useTodos() {
  //

  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const {
    error,
    loading,
    item: todos,
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
  } = useLocalStorage("V1", []);
  //

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  const searchedTodos = !searchValue.length
    ? todos
    : todos.filter((todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
      });

  const addTodo = (text) => {
    const newTodos = [...todos, { text: text, completed: false }];
    saveTodos(newTodos);
  };

  const completeTodo = (text) => {
    const newTodos = todos.map((obj) =>
      obj.text === text ? { ...obj, completed: true } : obj
    );
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = todos.filter((x) => x.text !== text);
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

