import { useLocalStorage } from "./useLocalStorage";

/**
 * [Ejecución: 5] Hook useTodos.
 * Orquestra la lógica de las tareas y se conecta con la persistencia.
 */
function useTodos(searchValue) {
    // [Ejecución: 6] Conexión con localStorage
    const {
        item: todos,
        saveItem: saveTodos,
        isLoading,
        hasError,
        synchronizeItem: synchronizeTodos,
    } = useLocalStorage("TODOS_V1", []);

    // [Cálculo: Dinámico en cada render]
    const completedTodos = todos.filter((todo) => !!todo.completed).length;
    const totalTodos = todos.length;

    const searchedTodos = todos.filter((todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
    });

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            completed: false,
            text,
        });
        saveTodos(newTodos);
    };

    const completeTodo = (text) => {
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        if (todoIndex >= 0) {
            const newTodos = [...todos];
            newTodos[todoIndex].completed = true;
            saveTodos(newTodos);
        }
    };

    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex((todo) => todo.text === text);
        if (todoIndex >= 0) {
            const newTodos = [...todos];
            newTodos.splice(todoIndex, 1);
            saveTodos(newTodos);
        }
    };

    const state = {
        isLoading,
        hasError,
        totalTodos,
        completedTodos,
        searchedTodos,
    };

    const stateUpdaters = {
        addTodo,
        completeTodo,
        deleteTodo,
        synchronizeTodos,
    };

    return { state, stateUpdaters };
}

export { useTodos };
