import React, { useState } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
    //
    const { loading, error, item: data, saveItem } = useLocalStorage("V1", []);
    const [openModel, setOpenModal] = useState(false);
    const [stateSearch, setStateSearch] = useState("");
    //
    const totalTodos = data.length;
    const completedTodos = data.filter((item) => item.completed).length;

    const searchedTodos =
        stateSearch.length === 0
            ? data
            : data.filter((item) =>
                  item.text.toLowerCase().includes(stateSearch.toLowerCase())
              );

    /* Todo Operations: */
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
        const copyTodos = [...data]; // copy array
        const index = data.findIndex((item) => item.text === text); // return number
        copyTodos[index].completed = true; //cambiar a true
        saveItem(copyTodos);
    };

    const onDeleteItem = (text) => {
        const copyTodos = [...data]; // copy array
        const index = data.findIndex((item) => item.text === text); // return number
        copyTodos.splice(index, 1); // delete 1 element
        saveItem(copyTodos);
    };
    /* Context Value: */
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
