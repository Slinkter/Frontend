import React from "react";
// useContext
import { TodoContext } from "../components/TodoContext";
// Components
import { TodoCounter } from "../components/TodoCounter";
import { TodoSearch } from "../components/TodoSearch";
import { TodoList } from "../components/TodoList";
import { TodoItem } from "../components/TodoItem";
import { TodoForm } from "../components/TodoForm";
// Tools
import { CreateTodoButton } from "../components/CreateTodoButton";
import { Modal } from "../components/Modal";

/* 
This file defines the UI component for the Todo List application. 
It utilizes the Context API to access global state and conditionally renders different elements based on the state
*/

function AppUI() {
    const {
        error,
        loading,
        searchedTodos: listTodos,
        onUpdateItem,
        onDeleteItem,
        openModel,
        setOpenModal,
    } = React.useContext(TodoContext);

    /* Conditional Rendering */
    const renderError = error && <p> Hubo un error</p>;
    const renderLoading = loading && <p> Estamos cargando</p>;
    const renderFT = !loading && !listTodos && <p>Crear tu primer TODO</p>;
    const renderList = listTodos.map((item) => (
        <TodoItem
            key={item.text}
            text={item.text}
            completed={item.completed}
            onUpdateItem={() => onUpdateItem(item.text)}
            onDeleteItem={() => onDeleteItem(item.text)}
        />
    ));

    const showModal = openModel && (
        <Modal>
            <TodoForm />
        </Modal>
    );

    return (
        <>
            <TodoCounter />
            <TodoSearch />
            <TodoList>
                {renderError}
                {renderLoading}
                {renderFT}
                {renderList}
            </TodoList>
            <CreateTodoButton setOpenModal={setOpenModal} />
            {showModal}
        </>
    );
}

export { AppUI };
