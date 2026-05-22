import React, { useState, useMemo, useCallback } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";

const TodoContext = React.createContext();

const TodoProvider = ({ children }) => {
    //
    const {
        isLoading,
        hasError,
        storedData: todos,
        saveData: saveTodos,
    } = useLocalStorage("V1", []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const totalTodos = todos.length;
    const completedTodos = todos.filter((todo) => todo.completed).length;

    /**
     * Filtra la lista de TODOs basándose en el valor del input de búsqueda.
     */
    const searchedTodos = useMemo(() => {
        if (searchValue.length === 0) return todos;
        return todos.filter((todo) =>
            todo.text.toLowerCase().includes(searchValue.toLowerCase()),
        );
    }, [todos, searchValue]);

    /**
     * Añade un nuevo ítem TODO a la lista.
     * @param {string} text - La descripción del nuevo TODO.
     * @remarks Actualiza toda la lista de todos en el estado y en localStorage.
     */
    const addTodo = useCallback(
        (text) => {
            const newTodos = [...todos];
            newTodos.push({
                text,
                completed: false,
            });
            saveTodos(newTodos);
        },
        [todos, saveTodos],
    );

    const completeTodo = useCallback(
        (text) => {
            const newTodos = [...todos];
            const todoIndex = newTodos.findIndex((todo) => todo.text === text);
            if (todoIndex !== -1) {
                newTodos[todoIndex].completed = true;
                saveTodos(newTodos);
            }
        },
        [todos, saveTodos],
    );

    const deleteTodo = useCallback(
        (text) => {
            const newTodos = [...todos];
            const todoIndex = newTodos.findIndex((todo) => todo.text === text);
            if (todoIndex !== -1) {
                newTodos.splice(todoIndex, 1);
                saveTodos(newTodos);
            }
        },
        [todos, saveTodos],
    );

    const propsValue = {
        isLoading,
        hasError,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        addTodo,
        completeTodo,
        deleteTodo,
        isModalOpen,
        setIsModalOpen,
    };

    return (
        <TodoContext.Provider value={propsValue}>
            {children}
        </TodoContext.Provider>
    );
};

export { TodoContext, TodoProvider };
