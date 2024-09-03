import React from "react";
import { TodoContext } from "../TodoContext";
import "./TodoCounter.css";

function TodoCounter() {
  const { count_TotalTodos, count_CompletedTodos } =
    React.useContext(TodoContext);

  return (
    <h2 className="TodoCounterh2">
      Has compleado {count_CompletedTodos} de {count_TotalTodos} TODOs{" "}
    </h2>
  );
}

export { TodoCounter };
