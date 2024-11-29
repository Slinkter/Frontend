import React from "react";
/*  */
import { useTodos } from "./useTodos";
/*  */
import { TodoHeader } from "../TodoHeader";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodosError } from "../TodosError";
import { TodosLoading } from "../TodosLoading";
import { EmptyTodos } from "../EmptyTodos";
import { TodoItem } from "../TodoItem";
import { Modal } from "../Modal";
import { TodoForm } from "../TodoForm";
import { CreateTodoButton } from "../CreateTodoButton";
import { ChangeAlert } from "../ChangeAlert";

function App() {
    /* patron  custom hooks y  patron render prop */
    /* custom hooks */
    const {
        error,
        loading,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        addTodo,
        sincronizeTodos,
    } = useTodos();

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

//---------------> Children

/* 
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
</TodoList>;
 */

//---------------> Render Props:
/*  <TodoList
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
     render={(todo) => (
         <TodoItem
             key={todo.text}
             text={todo.text}
             completed={todo.completed}
             onComplete={() => completeTodo(todo.text)}
             onDelete={() => deleteTodo(todo.text)}
         />
     )}
 />;
 */
