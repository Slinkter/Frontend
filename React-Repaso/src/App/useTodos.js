import { useState } from "react";
import useLocalStorage from "./db_local/useLocalStorage";

function useTodos() {
  const {
    loading,
    error,
    item: todos,
    saveItem: saveTodos,
    synceItem: sincronizeTodos,
  } = useLocalStorage("TODO_V1", []);
  /*  */
  const [searchValue, setSearchValue] = useState("");
  const [openModal, setOpenModal] = useState(false);

  /* modificadores  */
  const addTodo = (text) => {
    const newTodo = { text: text, completed: false }; // crear todo
    const list = [...todos]; // copia lista todo
    list.push(newTodo); // agrega todo
    saveTodos(list); // actualiza todo
  };
  const completeTodo = (text) => {
    const index = todos.findIndex((todo) => todo.text === text);
    const list = [...todos];
    list[index].completed = true;
    saveTodos(list);
  };
  const deleteTodo = (text) => {
    const index = todos.findIndex((todo) => todo.text === text);
    const list = [...todos];
    list.splice(index, 1);
    saveTodos(list);
  };
  /* cantidad de complete y cantidad de todos */
  let seachedTodos = [];
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  /*  */
  if (!searchValue.length >= 1) {
    seachedTodos = todos;
  } else {
    seachedTodos = todos.filter((todo) => {
      const text = todo.text.toLowerCase();
      const searchedText = searchValue.toLowerCase();
      return text.includes(searchedText);
    });
  }

  /* variables export */
  return {
    loading,
    error,
    sincronizeTodos,
    addTodo,
    completeTodo,
    deleteTodo,
    completedTodos,
    totalTodos,
    seachedTodos,
    searchValue,
    setSearchValue,
    openModal,
    setOpenModal,
  };
}

export { useTodos };
