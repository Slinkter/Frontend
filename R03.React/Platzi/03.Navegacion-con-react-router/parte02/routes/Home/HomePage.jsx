import React from "react";
import { useNavigate } from "react-router-dom";
import { ChangeAlert } from "../../ui/ChangeAlert";
import { CreateTodoButton } from "../../ui/CreateTodoButton";
import { EmptyTodos } from "../../ui/EmptyTodos";
import { TodoCounter } from "../../ui/TodoCounter";
import { TodoHeader } from "../../ui/TodoHeader";
import { TodoItem } from "../../ui/TodoItem";
import { TodoList } from "../../ui/TodoList";
import { TodoSearch } from "../../ui/TodoSearch";
import { TodosError } from "../../ui/TodosError";
import { TodosLoading } from "../../ui/TodosLoading";
import { useTodos } from "../useTodos";

function HomePage() {
    const { state, stateUpdaters } = useTodos();
    const navigate = useNavigate();

    const {
        error,
        loading,
        searchedTodos,
        totalTodos,
        completedTodos,
        searchValue,
    } = state;

    const { completeTodo, deleteTodo, setSearchValue, sincronizeTodos } =
        stateUpdaters;

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
                /*  */
                onError={() => <TodosError />}
                onLoading={() => <TodosLoading />}
                onEmptyTodos={() => <EmptyTodos />}
                onEmptySearchResults={(searchText) => (
                    <p>No hay resultados para {searchText}</p>
                )}
            >
                {(todo) => (
                    <TodoItem
                        key={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        onEdit={() =>
                            navigate("/edit/" + todo.id, { state: { todo } })
                        }
                        onComplete={() => completeTodo(todo.id)}
                        onDelete={() => deleteTodo(todo.id)}
                    />
                )}
            </TodoList>

            <CreateTodoButton onclick={() => navigate("/new")} />

            <ChangeAlert sincronize={sincronizeTodos} />
        </>
    );
}

export { HomePage };
