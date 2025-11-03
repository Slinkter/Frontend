import { useLocalStorage } from "./useLocalStorage";

function useTodos(searchValue) {
    const {
        loading,
        error,
        item: data,
        saveItem: saveTodos,
        sincronizeItem: sincronizeTodos,
    } = useLocalStorage("TODOS_V1", []);

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

    const states = {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchedTodos,
    };

    const stateUpdaters = {
        addTodo,
        completeTodo,
        deleteTodo,
        sincronizeTodos,
    };

    return { state: states, stateUpdaters };
}

export { useTodos };
