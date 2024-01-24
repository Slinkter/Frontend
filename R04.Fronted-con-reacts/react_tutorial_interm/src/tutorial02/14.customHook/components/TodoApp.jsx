import React from "react";
import useTodos from "../hook/useTodos";

const initialTodos = [
  { id: 1, title: "learing react" },
  { id: 2, title: "learing node" },
];
const TodoApp = () => {
  //
  const [todos, addTodo, deleteTodo] = useTodos(initialTodos);
  //
  const handleBtnAdd = () => addTodo({ title: "new Todo" });
  //
  return (
    <div className="container m-5">
      <button className="btn btn-primary m-2" onClick={handleBtnAdd}>
        Add Todo
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
