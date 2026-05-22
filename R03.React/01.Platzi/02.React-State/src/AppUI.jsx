import React from "react";
import {
    TodoHeader,
    TodoCounter,
    TodoSearch,
    TodoList,
    TodoItem,
    TodosError,
    TodosLoading,
    EmptyTodos,
    TodoForm,
    CreateTodoButton,
    Modal,
    ChangeAlert,
} from "./components";

/**
 * [Ejecución: 8] AppUI (Presenter).
 * Recibe el estado actual y dibuja la interfaz.
 */
function AppUI(props) {
    const {
        isLoading,
        hasError,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
        isOpenModal,
        setIsOpenModal,
        addTodo,
        synchronizeTodos,
    } = props;

    /**
     * Ciclo de Vida del Renderizado:
     * 1. Primer render: 'isLoading' es true (desde Ejecución 6.2).
     * 2. Post-render: Se ejecuta 'useEffect' (Ejecución 7).
     * 3. Segundo render: 'isLoading' es false y se muestran los 'todos' (desde Actualización de Estado en Ejecución 7).
     */

    return (
        <>
            <TodoHeader isLoading={isLoading}>
                <TodoCounter
                    totalTodos={totalTodos}
                    completedTodos={completedTodos}
                />
                <TodoSearch
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
            </TodoHeader>

            <TodoList>
                {hasError && <TodosError />}
                {isLoading && <TodosLoading />}
                {!isLoading && !searchedTodos.length && <EmptyTodos />}
                
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

            {!!isOpenModal && (
                <Modal>
                    <TodoForm addTodo={addTodo} setIsOpenModal={setIsOpenModal} />
                </Modal>
            )}

            <CreateTodoButton setIsOpenModal={setIsOpenModal} />
            <ChangeAlert synchronize={synchronizeTodos} />
        </>
    );
}

export { AppUI };
