import React from "react";
// custom hooks
import { useTodos } from "./hook/useTodos";
// components
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

function App() {
    /* 
  - custom hook
  El hook useTodos es un hook personalizado que encapsula la lógica de manejo del estado y las funciones 
  relacionadas con los todos. Esto ayuda a mantener la lógica separada de la presentación, mejorando
  la reutilización y la legibilidad del código.
  */
    const { state, stateUpdaters } = useTodos();
    const {
        error,
        loading,
        searchedTodos,
        totalTodos,
        completedTodos,
        openModal,
        searchValue,
    } = state;
    const {
        setOpenModal,
        addTodo,
        completeTodo,
        deleteTodo,
        setSearchValue,
        sincronizeTodos,
    } = stateUpdaters;

    return (
        <>
            <TodoHeader loading={loading}>
                <TodoCounter
                    totalTodos={totalTodos}
                    completedTodos={completedTodos}
                />
                <TodoSearch
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
            </TodoHeader>

            <TodoList
                error={error}
                loading={loading}
                totalTodos={totalTodos}
                searchedTodos={searchedTodos}
                searchText={searchValue}
                onError={() => <TodosError />}
                onLoading={() => <TodosLoading />}
                onEmptyTodos={() => <EmptyTodos />}
                onEmptySearchResults={(searchText) => (
                    <p>No hay resultados para {searchText}</p>
                )}
            >
                {(todo) => (
                    <TodoItem
                        key={todo.text}
                        text={todo.text}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo.text)}
                        onDelete={() => deleteTodo(todo.text)}
                    />
                )}
            </TodoList>

            {!!openModal && (
                <Modal>
                    <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
                </Modal>
            )}

            <CreateTodoButton setOpenModal={setOpenModal} />
            <ChangeAlert sincronize={sincronizeTodos} />
        </>
    );
}

export default App;
