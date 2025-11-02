import React from "react";
import useLocalStorage from "../hook/useLocalStorage";
import { useState } from "react";

const TodoContext = React.createContext();
const TodoProvider = (props) => {
    const { loading, error, data, setDataLocal } = useLocalStorage("TODOS_V1");
    const [searchInput, setSearchInput] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const countTotal = data.length;
    const countTotalCompleted = data.filter((item) => item.completed).length;

    let renderList = [];
    if (searchInput.length === 0) {
        renderList = data;
    } else {
        renderList = data.filter((item) =>
            item.text.toLowerCase().includes(searchInput.toLowerCase())
        );
    }

    const addTodo = (text) => {
        const cyData = [...data];
        cyData.push({ text: text, completed: false });
        setDataLocal(cyData);
    };

    const deleteTodo = (text) => {
        const cyData = [...data];
        const index = cyData.findIndex((item) => item.text === text);
        cyData.splice(index, 1);
        setDataLocal(cyData);
    };
    const editTodo = (text) => {
        const cyData = [...data];
        const index = cyData.findIndex((item) => item.text === text);
        cyData[index].completed = !cyData[index].completed;
        setDataLocal(cyData);
    };

    const values = {
        renderList,
        addTodo,
        deleteTodo,
        editTodo,
        loading,
        error,
        searchInput,
        setSearchInput,
        countTotal,
        countTotalCompleted,
        openModal,
        setOpenModal,
    };

    return (
        <TodoContext.Provider value={values}>
            {props.children}
        </TodoContext.Provider>
    );
};

export { TodoContext, TodoProvider };
