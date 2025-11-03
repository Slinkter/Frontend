import React, { useReducer } from "react";
import { useLocalStorage } from "./useLocalStorage";

const initialState = {
    searchValue: "",
    openModal: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SEARCH_VALUE":
            return {
                ...state,
                searchValue: action.payload,
            };
        case "SET_OPEN_MODAL":
            return {
                ...state,
                openModal: action.payload,
            };
        default:
            return state;
    }
};

function useTodos() {
    const {
        item: data,
        saveItem: saveTodos,
        loading,
        error,
        sincronizeItem: sincronizeTodos,
    } = useLocalStorage("TODOS_V1", []);

    const [state, dispatch] = useReducer(reducer, initialState);

    const { searchValue, openModal } = state;

    const completedTodos = data.filter((todo) => !!todo.completed).length;
    const totalTodos = data.length;

    const searchedTodos = data.filter((todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
    });

    const addTodo = (text) => {
        const newTodos = [...data];
        newTodos.push({
            completed: false,
            text,
        });
        saveTodos(newTodos);
    };

    const completeTodo = (text) => {
        const todoIndex = data.findIndex((todo) => todo.text === text);
        const newTodos = [...data];
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const todoIndex = data.findIndex((todo) => todo.text === text);
        const newTodos = [...data];
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    const setSearchValue = (payload) => {
        dispatch({ type: "SET_SEARCH_VALUE", payload });
    };

    const setOpenModal = (payload) => {
        dispatch({ type: "SET_OPEN_MODAL", payload });
    };

    const states = {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        searchedTodos,
        openModal,
    };

    const stateUpdaters = {
        setSearchValue,
        addTodo,
        completeTodo,
        deleteTodo,
        setOpenModal,
        sincronizeTodos,
    };

    return { state: states, stateUpdaters };
}

export { useTodos };
