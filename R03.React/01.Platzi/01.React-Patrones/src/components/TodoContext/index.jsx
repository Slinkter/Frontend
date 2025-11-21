/**
 * @file TodoContext.jsx
 * @description Provides the TodoContext to the application.
 * This context manages the entire state of the TODOs application.
 * @function TodoProvider
 * @description Provides the TODO-related state and functions to the component tree.
 * It encapsulates the logic from the `useTodos` hook.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @returns {JSX.Element} - The TodoContext.Provider component.
 */

import React from "react";
import { useTodos } from "../../hook/useTodos";
const TodoContext = React.createContext();

function TodoProvider(props) {
    // Use the custom hook to get the state and functions
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

    // Provide the state and functions to the children components
    return (
        <TodoContext.Provider
            value={{
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
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };
