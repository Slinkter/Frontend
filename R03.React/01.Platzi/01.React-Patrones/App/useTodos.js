import React from "react";
import { useLocalStorage } from "./db_local/useLocalStorage";

function useTodos() {
    //

    const [searchValue, setSearchValue] = React.useState("");
    const [openModal, setOpenModal] = React.useState(false);
    const {
        error,
        loading,
        item: todos,
        saveItem: saveTodos,
        sincronizeItem: sincronizeTodos,
    } = useLocalStorage("V1", []);
    //

    const completedTodos = todos.filter((todo) => todo.completed).length;
    const totalTodos = todos.length;
    const searchedTodos = !searchValue.length
        ? todos
        : todos.filter((todo) => {
              const todoText = todo.text.toLowerCase();
              const searchText = searchValue.toLowerCase();
              return todoText.includes(searchText);
          });

    const addTodo = (text) => {
        /*  
        const newTodos = [...todos];
        const item = {
            completed: false,
            text: text,
        };
        newTodos.push(item);
        saveTodos(newTodos); 
        */
        const newTodos = [...todos, { text: text, completed: false }];
        saveTodos(newTodos);
    };

    const completeTodo = (text) => {
        /*  
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos); 
        */

        const newTodos = todos.map((obj) =>
            obj.text === text ? { ...obj, completed: true } : obj
        );
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        /*     
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
         */
        const newTodos = todos.filter((x) => x.text !== text);
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
