import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { TodoForm } from "../../components/TodoForm";
import { useTodos } from "../../hooks/useTodos";

/**
 * Página de Edición de TODOs.
 * Recupera el ID del TODO desde la URL y pre-carga la información en el formulario.
 * Maneja el estado de carga y la obtención de datos mediante el custom hook useTodos.
 * 
 * @returns {JSX.Element} Vista de edición.
 */
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
