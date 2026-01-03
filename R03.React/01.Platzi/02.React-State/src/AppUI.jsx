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
 * The main user interface presentation component for the TODO application.
 * This component receives all necessary data and state-updating functions as props
 * from the `App` container component and composes the entire UI.
 * It's responsible for rendering the visual structure based on the application state.
 *
 * @param {object} props The component's properties.
 * @param {boolean} props.loading Indicates if the application data is currently loading.
 * @param {boolean} props.error Indicates if an error occurred while fetching data.
 * @param {number} props.totalTodos The total number of TODOs.
 * @param {number} props.completedTodos The number of completed TODOs.
 * @param {string} props.searchValue The current value of the search input.
 * @param {function(string): void} props.setSearchValue A function to update the search value.
 * @param {Array<{text: string, completed: boolean}>} props.searchedTodos A list of TODOs filtered by the search value.
 * @param {function(string): void} props.completeTodo A function to mark a TODO as complete.
 * @param {function(string): void} props.deleteTodo A function to delete a TODO.
 * @param {boolean} props.openModal Indicates if the modal for creating TODOs is open.
 * @param {function(boolean): void} props.setOpenModal A function to control the modal's visibility.
 * @param {function(string): void} props.addTodo A function to add a new TODO.
 * @param {function(): void} props.sincronizeTodos A function to synchronize TODOs across tabs.
 * @returns {React.ReactElement} The rendered application user interface.
 */
function AppUI(props) {
    const {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        addTodo,
        sincronizeTodos,
    } = props;

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

export { AppUI };
