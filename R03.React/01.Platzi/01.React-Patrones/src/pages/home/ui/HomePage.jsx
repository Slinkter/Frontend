import React from "react";
import { useTodoContext } from "@/entities/todo";
import { TodoHeader } from "@/widgets/header";
import {
    TodoList,
    TodosError,
    TodosLoading,
    EmptyTodos,
} from "@/widgets/todo-list";
import { TodoItem, TodoCounter } from "@/entities/todo";
import { TodoSearch } from "@/features/filter-todo";
import { TodoForm } from "@/features/create-todo";
import { ChangeAlert } from "@/features/sync-todo";
import { Modal, CreateTodoButton } from "@/shared/ui";

/**
 * @file HomePage.jsx
 * @description La página principal de la aplicación de TODOs. Organiza la estructura y las secciones principales de la UI.
 * @returns {JSX.Element} - El componente HomePage.
 */
const HomePage = () => {
    // Consume el contexto mediante un hook personalizado para un código más limpio y seguro.
    const {
        error,
        loading,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
    } = useTodoContext();

    return (
        <>
            {/* Sección de encabezado que contiene el contador y la barra de búsqueda */}
            <TodoHeader loading={loading}>
                <TodoCounter />
                <TodoSearch />
            </TodoHeader>

            {/* Lista principal de TODOs */}
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

            {/* Mostrar modal para crear un nuevo TODO si openModal es verdadero */}
            {!!openModal && (
                <Modal>
                    <TodoForm />
                </Modal>
            )}

            {/* Botón para abrir el modal de creación de TODO */}
            <CreateTodoButton />

            {/* Alerta para notificar cambios en otras pestañas */}
            <ChangeAlert />
        </>
    );
};

export { HomePage };
