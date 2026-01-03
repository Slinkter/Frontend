import { useLocalStorage } from "./useLocalStorage";

/**
 * Custom hook to manage the application's TODOs logic.
 * It encapsulates all business logic related to TODOs, including
 * creating, completing, deleting, and filtering them.
 *
 * @param {string} searchValue The current value from the search input.
 * @returns {{
 *  state: {
 *      loading: boolean,
 *      error: boolean,
 *      totalTodos: number,
 *      completedTodos: number,
 *      searchedTodos: Array<{text: string, completed: boolean}>
 *  },
 *  stateUpdaters: {
 *      addTodo: function(string): void,
 *      completeTodo: function(string): void,
 *      deleteTodo: function(string): void,
 *      sincronizeTodos: function(): void
 *  }
 * }} An object containing the application state and functions to update it.
 */
function useTodos(searchValue) {
    const {
        item: data,
        saveItem: saveTodos,
        loading,
        error,
        sincronizeItem: sincronizeTodos,
    } = useLocalStorage("TODOS_V1", []);

    /** @type {number} The total number of completed TODOs. */
    const completedTodos = data.filter((todo) => !!todo.completed).length;
    /** @type {number} The total number of TODOs. */
    const totalTodos = data.length;

    /** @type {Array<{text: string, completed: boolean}>} A derived list of TODOs filtered by the searchValue. */
    const searchedTodos = data.filter((todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
    });

    /**
     * Adds a new TODO to the list.
     * @param {string} text The text of the new TODO.
     */
    const addTodo = (text) => {
        const newTodos = [...data];
        newTodos.push({
            completed: false,
            text,
        });
        saveTodos(newTodos);
    };

    /**
     * Marks a TODO as completed.
     * @param {string} text The text of the TODO to complete.
     */
    const completeTodo = (text) => {
        const todoIndex = data.findIndex((todo) => todo.text === text);
        if (todoIndex >= 0) {
            const newTodos = [...data];
            newTodos[todoIndex].completed = true;
            saveTodos(newTodos);
        }
    };

    /**
     * Deletes a TODO from the list.
     * @param {string} text The text of the TODO to delete.
     */
    const deleteTodo = (text) => {
        const todoIndex = data.findIndex((todo) => todo.text === text);
        if (todoIndex >= 0) {
            const newTodos = [...data];
            newTodos.splice(todoIndex, 1);
            saveTodos(newTodos);
        }
    };

    /** The state values derived from the TODOs data. */
    const states = {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchedTodos,
    };

    /** The functions to update the TODOs state. */
    const stateUpdaters = {
        addTodo,
        completeTodo,
        deleteTodo,
        sincronizeTodos,
    };

    return { state: states, stateUpdaters };
}

export { useTodos };
