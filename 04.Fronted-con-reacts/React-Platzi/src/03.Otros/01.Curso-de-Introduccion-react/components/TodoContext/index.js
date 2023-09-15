import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
    const {
        loading,
        error,
        item: data,
        saveItem,
    } = useLocalStorage("TODOS_V1", []);
    //
    const [openModel, setOpenModal] = React.useState(false);
    const [stateSearch, setStateSearch] = React.useState("");
    //
    const totalTodos = data.length;
    const completedTodos = data.filter((item) => !!item.completed).length;

    let searchedTodos = [];

    if (!stateSearch.length >= 1) {
        searchedTodos = data;
    } else {
        searchedTodos = data.filter((item) => {
            const todoText = item.text.toLowerCase();
            const searchText = stateSearch.toLowerCase();
            return todoText.includes(searchText);
        });
    }

    //metodo , cambiar de false a true saveItem

    const addTodo = (text) => {
        const newTodos = [...data]; // copy array
        newTodos.push({
            competed: false,
            text,
        }); //cambiar a true
        saveItem(newTodos);
    };

    const onUpdateItem = (text) => {
        const index = data.findIndex((item) => item.text === text); // si coincide el text ,coger index , sale un numero
        const newTodos = [...data]; // copy array
        newTodos[index].completed = true; //cambiar a true
        saveItem(newTodos);
    };

    const onDeleteItem = (text) => {
        const index = data.findIndex((item) => item.text === text); // si coincide el text ,coger
        const newTodos = [...data];
        newTodos.splice(index, 1);
        saveItem(newTodos);
    };

    //===============================>

    return (
        <TodoContext.Provider
            value={{
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
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
}
export { TodoContext, TodoProvider };
