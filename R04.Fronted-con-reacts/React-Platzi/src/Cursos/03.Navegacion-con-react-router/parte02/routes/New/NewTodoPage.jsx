import React from "react";
import { TodoForm } from "../../ui/TodoForm";
import { useTodos } from "../useTodos";

const NewTodoPage = () => {
    const { stateUpdaters } = useTodos();
    const { addTodo } = stateUpdaters;
    return (
        <div>
            <h1>NewTodoPage</h1>
            <TodoForm
                label="escribe tu nuevo todo"
                submitText="agregar"
                submitEvent={(text) => addTodo(text)}
            />
        </div>
    );
};

export { NewTodoPage };
