import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { TodoForm } from "../../ui/TodoForm";
import { useTodos } from "../useTodos";

const EditTodoPage = () => {
  const location = useLocation();

  const { id } = useParams();
  const idTodo = Number(id);

  const { state, stateUpdaters } = useTodos();

  const { getTodo, loading } = state;
  const { editTodo } = stateUpdaters;

  let todoText;

  if (location.state?.todo) {
    todoText = location.state.todo.text;
  } else if (loading) {
    return <p>cargando ...</p>;
  } else {
    const todo = getTodo(idTodo);
    todoText = todo.text;
  }

  return (
    <div>
      <h1>EditTodoPage</h1>
      <TodoForm
        label="edita tu todo"
        defaultTodoText={todoText}
        submitText="editar"
        submitEvent={(newText) => editTodo(idTodo, newText)}
      />
    </div>
  );
};

export { EditTodoPage };
