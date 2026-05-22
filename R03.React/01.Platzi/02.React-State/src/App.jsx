import React from "react";
import { useTodos } from "./hook/useTodos";
import { useModal } from "./hook/useModal.js";
import { useSearch } from "./hook/useSearch.js";
import { AppUI } from "./AppUI.jsx";

/**
 * [Ejecución: 2] Componente App (Container).
 * Se inicializa y comienza a llamar a sus Custom Hooks para obtener el estado.
 */
function App() {
    // [Ejecución: 3] Inicialización de hooks de UI (Modal y Búsqueda)
    const { searchValue, setSearchValue } = useSearch();
    const { isOpenModal, setIsOpenModal } = useModal();

    // [Ejecución: 4] Inicialización del hook de negocio principal
    // Pasa 'searchValue' como dependencia para filtrar los TODOs
    const {
        state: {
            isLoading,
            hasError,
            totalTodos,
            completedTodos,
            searchedTodos,
        },
        stateUpdaters: { completeTodo, deleteTodo, addTodo, synchronizeTodos },
    } = useTodos(searchValue);

    // [Ejecución: 8] Renderizado de la UI pasando todo el estado obtenido
    return (
        <AppUI
            isLoading={isLoading}
            hasError={hasError}
            totalTodos={totalTodos}
            completedTodos={completedTodos}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchedTodos={searchedTodos}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            addTodo={addTodo}
            synchronizeTodos={synchronizeTodos}
        />
    );
}

export default App;
