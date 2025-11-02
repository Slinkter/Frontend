import React from "react";
import { TodoContext } from "./components/TodoContext/index.jsx";
import { TodoHeader } from "./components/TodoHeader";
import { TodoCounter } from "./components/TodoCounter";
import { TodoSearch } from "./components/TodoSearch";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";
import { TodosError } from "./components/TodosError";
import { TodosLoading } from "./components/TodosLoading";
import { EmptyTodos } from "./components/EmptyTodos";
import { Modal } from "./components/Modal";
import { TodoForm } from "./components/TodoForm";
import { CreateTodoButton } from "./components/CreateTodoButton";
import { ChangeAlert } from "./components/ChangeAlert";

/**
 * @file AppUI.jsx
 * @description The UI component for the Todo application.
 * @returns {JSX.Element} - The AppUI component.
 */

const AppUI = () => {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
  } = React.useContext(TodoContext);

  return (
    <>
      <TodoHeader>
        <TodoCounter />
        <TodoSearch />
      </TodoHeader>

      <TodoList>
        {error && <TodosError />}
        {loading && <TodosLoading />}
        {!loading && !searchedTodos.length && <EmptyTodos />}
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      {!!openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}

      <CreateTodoButton />
      <ChangeAlert />
    </>
  );
};

export { AppUI };
