import React, { useState } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";

/**
 * React Context to manage the application's global state.
 * @type {React.Context<any>}
 */
const TodoContext = React.createContext();

/**
 * Provider component that encapsulates the logic for managing the TODO list state.
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components that will consume the context.
 * @returns {JSX.Element} The provider component.
 */
function TodoProvider(props) {
    const { loading, error, item: data, saveItem } = useLocalStorage("V1", []);
    const [openModel, setOpenModal] = useState(false);
    const [stateSearch, setStateSearch] = useState("");

    const totalTodos = data.length;
    const completedTodos = data.filter((item) => item.completed).length;

    const searchedTodos =
        stateSearch.length === 0
            ? data
            : data.filter((item) =>
                  item.text.toLowerCase().includes(stateSearch.toLowerCase())
              );

    /**
     * Adds a new TODO item to the list.
     * @param {string} text - The text of the new TODO.
     */
    const addTodo = (text) => {
        const copyTodos = [...data]; // copy array
        const newTodo = {
            text: text,
            completed: false, // Corrected typo from 'competed'
        };
        copyTodos.push(newTodo);
        saveItem(copyTodos);
    };

    /**
     * Marks a TODO item as completed.
     * @param {string} text - The text of the TODO to update.
     */
    const onUpdateItem = (text) => {
        const copyTodos = [...data]; // copy array
        const index = data.findIndex((item) => item.text === text); // return number
        copyTodos[index].completed = true; //cambiar a true
        saveItem(copyTodos);
    };

    /**
     * Deletes a TODO item from the list.
     * @param {string} text - The text of the TODO to delete.
     */
    const onDeleteItem = (text) => {
        const copyTodos = [...data]; // copy array
        const index = data.findIndex((item) => item.text === text); // return number
        copyTodos.splice(index, 1); // delete 1 element
        saveItem(copyTodos);
    };

    const values = {
        loading,
        error,
        totalTodos,
        completedTodos,
        stateSearch,
        setStateSearch,
        searchedTodos,
        addTodo,
        onUpdateItem,
        onDeleteItem,
        openModel,
        setOpenModal,
    };

    return (
        <TodoContext.Provider value={values}>
            {props.children}
        </TodoContext.Provider>
    );
}
export { TodoContext, TodoProvider };
