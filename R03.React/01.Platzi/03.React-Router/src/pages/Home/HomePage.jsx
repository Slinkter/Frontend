import React from "react";
import { useNavigate } from "react-router-dom";
import { ChangeAlert } from "../../components/ChangeAlert";
import { CreateTodoButton } from "../../components/CreateTodoButton";
import { EmptyTodos } from "../../components/EmptyTodos";
import { TodoCounter } from "../../components/TodoCounter";
import { TodoHeader } from "../../components/TodoHeader";
import { TodoItem } from "../../components/TodoItem";
import { TodoList } from "../../components/TodoList";
import { TodoSearch } from "../../components/TodoSearch";
import { TodosError } from "../../components/TodosError";
import { TodosLoading } from "../../components/TodosLoading";
import { useTodos } from "../../hooks/useTodos";

/**
 * Página de Inicio (Home Page).
 * Renderiza la lista principal de TODOs, el buscador, el contador y el botón de crear.
 * Utiliza el patrón "Composition" para inyectar componentes dentro de `TodoList` y `TodoHeader`.
 *
 * @returns {JSX.Element} La vista principal de la aplicación.
 */
function HomePage() {
    const navigate = useNavigate();
    const { state, stateUpdaters } = useTodos();

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
