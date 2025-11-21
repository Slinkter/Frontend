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
 * @description The UI component for the Todo application. This component is responsible for laying out the entire user interface.
 * @returns {JSX.Element} - The AppUI component.
 */
const AppUI = () => {
    // Consume the context to get state and dispatchers
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
            {/* Header section containing the counter and search bar */}
            <TodoHeader>
                <TodoCounter />
                <TodoSearch />
            </TodoHeader>

            {/* Main list of TODOs */}
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

            {/* Show modal for creating a new TODO if openModal is true */}
            {!!openModal && (
                <Modal>
                    <TodoForm />
                </Modal>
            )}

            {/* Button to open the create TODO modal */}
            <CreateTodoButton />
            {/* Alert to notify of changes in other tabs */}
            <ChangeAlert />
        </>
    );
};

export { AppUI };
