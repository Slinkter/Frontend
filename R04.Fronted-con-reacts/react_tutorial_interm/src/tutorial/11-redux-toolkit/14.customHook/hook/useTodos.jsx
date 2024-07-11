import { useState } from "react";

const useTodos = (initialValue) => {
  const [todos, setTodos] = useState(initialValue);

  function addTodo(todo) {
    todo.id = Date.now();
    setTodos([...todos, todo]);
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return [todos, addTodo, deleteTodo];
};

export default useTodos;
