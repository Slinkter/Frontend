import React from 'react';
import { useTodos } from '../../hook/useTodos';

/**
 * @file TodoContext.jsx
 * @description Provides the TodoContext to the application.
 */

const TodoContext = React.createContext();

/**
 * @function TodoProvider
 * @description Provides the todo-related state and functions to the component tree.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @returns {JSX.Element} - The TodoContext.Provider component.
 */

function TodoProvider(props) {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    addTodo,
    sincronizeTodos,
  } = useTodos();

  return (
    <TodoContext.Provider value={{
      error,
      loading,
      searchedTodos,
      completeTodo,
      deleteTodo,
      openModal,
      setOpenModal,
      totalTodos,
      completedTodos,
      searchValue,
      setSearchValue,
      addTodo,
      sincronizeTodos,
    }}>
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };

