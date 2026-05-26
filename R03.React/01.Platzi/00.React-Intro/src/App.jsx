/**
 * @file App.jsx
 * @description Componente de presentación principal que orquesta la estructura de la interfaz.
 * @module components
 */

import React, { useContext } from "react";
import { TodoContext } from "./context/customContext";
import { TodoCounter } from "./components/TodoCounter.jsx";
import { TodoSearch } from "./components/TodoSearch.jsx";
import { TodoList } from "./components/TodoList.jsx";
import { TodoItem } from "./components/TodoItem.jsx";
import { TodoForm } from "./components/TodoForm.jsx";
import { CreateTodoButton } from "./components/CreateTodoButton.jsx";
import { Modal } from "./components/Modal.jsx";

/**
 * El componente principal del diseño de la interfaz de usuario.
 * @returns {JSX.Element} La interfaz de la aplicación ensamblada.
 * @remarks 
 * - Consume TodoContext para el estado reactivo de la interfaz.
 * - Separa la lógica de renderizado en fragmentos reutilizables.
 */
const AppUI = () => {
    const {
        hasError,
        isLoading,
        searchedTodos: filteredTodos,
        completeTodo,
        deleteTodo,
        isModalOpen,
        setIsModalOpen,
    } = useContext(TodoContext);

    /**
     * Renderiza un mensaje de error si la capa de persistencia falla.
     */
    const renderErrorMessage = hasError && <p>Hubo un error al cargar tus TODOs</p>;

    /**
     * Renderiza un estado de carga durante la obtención de datos.
     */
    const renderLoadingState = isLoading && <p>Cargando tus TODOs...</p>;

    /**
     * Renderiza un mensaje para usuarios nuevos o resultados de búsqueda vacíos.
     */
    const renderEmptyState = !isLoading && filteredTodos.length === 0 && (
        <p>¡Crea tu primer TODO!</p>
    );

    /**
     * Mapea los TODOs filtrados a la lista de componentes TodoItem.
     */
    const renderTodoList = filteredTodos.map((todo) => (
        <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
        />
    ));

    /**
     * Portal para la superposición del formulario de creación.
     */
    const renderModalContent = isModalOpen && (
        <Modal>
            <TodoForm />
        </Modal>
    );

    return (
        <>
            <TodoCounter />
            <TodoSearch />
            <TodoList>
                {renderErrorMessage}
                {renderLoadingState}
                {renderEmptyState}
                {renderTodoList}
            </TodoList>
            <CreateTodoButton setIsModalOpen={setIsModalOpen} />
            {renderModalContent}
        </>
    );
};

export { AppUI };
