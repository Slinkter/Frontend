import React from "react";
// useContext
import { TodoContext } from "./context/customContext";
// Components
import { TodoCounter } from "./components/TodoCounter.jsx";
import { TodoSearch } from "./components/TodoSearch.jsx";
import { TodoList } from "./components/TodoList.jsx";
import { TodoItem } from "./components/TodoItem.jsx";
import { TodoForm } from "./components/TodoForm.jsx";
// Tools
import { CreateTodoButton } from "./components/CreateTodoButton.jsx";
import { Modal } from "./components/Modal.jsx";

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
