import React from "react";
import { useLocalStorage, STORAGE_KEY_V1 } from "@/shared/lib";

/**
 * Hook personalizado para gestionar el estado y la lógica de la aplicación de TODOs.
 *
 * @returns {object} Un objeto que contiene todo el estado y las funciones requeridas por la aplicación.
 */
function useTodos() {
    // Estado para el valor del campo de búsqueda.
    const [searchValue, setSearchValue] = React.useState("");
    // Estado para controlar la visibilidad del modal para crear nuevos TODOs.
    const [openModal, setOpenModal] = React.useState(false);

    // Uso del hook `useLocalStorage` para persistir los TODOs.
    const {
        loading,
        error,
        item: todos,
        saveItem: saveTodos,
        sincronizeItem: sincronizeTodos,
    } = useLocalStorage(STORAGE_KEY_V1, []);

    // Estado derivado: El número de TODOs que han sido marcados como completados.
    const completedTodos = todos.filter((todo) => todo.completed).length;
    // Estado derivado: El número total de TODOs.
    const totalTodos = todos.length;

    // Estado derivado: Un nuevo array de TODOs filtrado basado en `searchValue`.
    const searchedTodos = !searchValue.length
        ? todos
        : todos.filter((todo) => {
              const todoText = todo.text.toLowerCase();
              const searchText = searchValue.toLowerCase();
              return todoText.includes(searchText);
          });

    /**
     * Añade un nuevo elemento TODO a la lista.
     * @param {string} text - El contenido de texto del nuevo TODO.
     */
    const addTodo = (text) => {
        const newTodos = [...todos, { text, completed: false }];
        saveTodos(newTodos);
    };

    /**
     * Marca un elemento TODO específico como completado.
     * @param {string} text - El texto del TODO que se marcará como completado.
     */
    const completeTodo = (text) => {
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };

    /**
     * Elimina un elemento TODO específico de la lista.
     * @param {string} text - El texto del TODO que se eliminará.
     */
    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    return {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        addTodo,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
        sincronizeTodos,
    };
}

export { useTodos };
