import React, { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
    const [openModel, setOpenModal] = useState(false);
    const [stateSearch, setStateSearch] = useState("");
    //
    const { loading, error, item: data, saveItem } = useLocalStorage("V1", []);
    //
    const totalTodos = data.length;
    const completedTodos = data.filter((item) => item.completed).length;

    let searchedTodos = [];

    if (stateSearch.length === 0) {
        searchedTodos = data;
    } else {
        searchedTodos = data.filter((item) =>
            item.text.toLowerCase().includes(stateSearch.toLowerCase())
        );
    }

    const addTodo = (text) => {
        const copyTodos = [...data]; // copy array
        const newTodo = {
            text: text,
            competed: false,
        };
        copyTodos.push(newTodo);
        saveItem(copyTodos);
    };

    const onUpdateItem = (text) => {
        const index = data.findIndex((item) => item.text === text); // return number
        const copyTodos = [...data]; // copy array
        copyTodos[index].completed = true; //cambiar a true
        saveItem(copyTodos);
    };

    const onDeleteItem = (text) => {
        const index = data.findIndex((item) => item.text === text); // return number
        const copyTodos = [...data]; // copy array
        copyTodos.splice(index, 1); // delete 1 element
        saveItem(copyTodos);
    };

    const global = {
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
        <TodoContext.Provider value={global}>
            {props.children}
        </TodoContext.Provider>
    );
}
export { TodoContext, TodoProvider };
