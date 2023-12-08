import React from "react";
import { useTodos } from "./useTodos";
import TodoCounter from "../TodoHeader/TodoCounter";
import TodoSearch from "../TodoHeader/TodoSearch";
import TodoHeader from "../TodoHeader";

const App = () => {
  const {
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
  } = useTodos();
  /* Console.log */

  /*  */

  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter totalTodos={totalTodos} completedTodos={completedTodos} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
      </TodoHeader>
    </React.Fragment>
  );
};

export default App;
