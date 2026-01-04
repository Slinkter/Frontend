import React from "react";
import { TodoForm } from "../../components/TodoForm";
import { useTodos } from "../../hooks/useTodos";

/**
 * Página de Creación de TODOs.
 * Renderiza el formulario vacío y conecta la acción de agregar con el estado global.
 * 
 * @returns {JSX.Element} Vista de creación.
 */
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