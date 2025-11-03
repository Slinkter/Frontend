import React from "react";
import { useTodos } from "./hook/useTodos";
import { useModal } from "./hook/useModal.js";
import { useSearch } from "./hook/useSearch.js";
import { AppUI } from "./AppUI.jsx";

function App() {
    const { openModal, setOpenModal } = useModal();
    const { searchValue, setSearchValue } = useSearch();
    const { 
        state: { loading, error, totalTodos, completedTodos, searchedTodos }, 
        stateUpdaters: { completeTodo, deleteTodo, addTodo, sincronizeTodos } 
    } = useTodos(searchValue);

    return (
        <AppUI
            loading={loading}
            error={error}
            totalTodos={totalTodos}
            completedTodos={completedTodos}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchedTodos={searchedTodos}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            openModal={openModal}
            setOpenModal={setOpenModal}
            addTodo={addTodo}
            sincronizeTodos={sincronizeTodos}
        />
    );
}

export default App;
