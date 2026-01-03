import React, { useReducer } from "react";

/**
 * Custom hook to manage state in localStorage with a reducer pattern.
 * It handles loading and error states, and synchronizes with localStorage.
 *
 * @param {string} itemName The key for the localStorage item.
 * @param {any} initialValue The initial value for the item if it doesn't exist in localStorage.
 * @returns {{
 *   item: any,
 *   saveItem: function(any): void,
 *   loading: boolean,
 *   error: boolean,
 *   sincronizeItem: function(): void
 * }} An object containing the state and functions to interact with it.
 */
function useLocalStorage(itemName, initialValue) {
    /**
     * Action types for the reducer.
     * @type {{error: string, success: string, save: string, sincronize: string}}
     */
    const actionTypes = {
        error: "ERROR",
        success: "SUCCESS",
        save: "SAVE",
        sincronize: "SINCRONIZE",
    };

    /**
     * Creates the initial state for the reducer.
     * @param {{initialValue: any}} params
     * @returns {{error: boolean, loading: boolean, item: any, sincronizedItem: boolean}}
     */
    const initialState = ({ initialValue }) => ({
        error: false,
        loading: true,
        item: initialValue,
        sincronizedItem: true,
    });

    /**
     * Reducer object mapping action types to state transformations.
     * @param {object} state The current state.
     * @param {any} payload The payload for the action.
     * @returns {object} The reducer logic object.
     */
    const reducerObj = (state, payload) => ({
        [actionTypes.error]: {
            ...state,
            error: true,
        },
        [actionTypes.success]: {
            ...state,
            error: false,
            loading: false,
            item: payload,
            sincronizedItem: true,
        },
        [actionTypes.save]: {
            ...state,
            item: payload,
        },
        [actionTypes.sincronize]: {
            ...state,
            loading: true,
            sincronizedItem: false,
        },
    });

    /**
     * The main reducer function.
     * @param {object} state The current state.
     * @param {{type: string, payload: any}} action The dispatched action.
     * @returns {object} The new state.
     */
    const reducer = (state, action) => {
        return reducerObj(state, action.payload)[action.type] || state;
    };

    const [state, dispatch] = useReducer(
        reducer,
        initialState({ initialValue })
    );

    const { error, loading, item } = state;

    // ACTION CREATORS
    /**
     * Dispatches an error action.
     * @param {any} error The error payload.
     */
    const onError = (error) =>
        dispatch({
            type: actionTypes.error,
            payload: error,
        });

    /**
     * Dispatches a success action.
     * @param {any} item The successfully retrieved item.
     */
    const onSuccess = (item) =>
        dispatch({
            type: actionTypes.success,
            payload: item,
        });

    /**
     * Dispatches a save action.
     * @param {any} item The item to be saved in the state.
     */
    const onSave = (item) =>
        dispatch({
            type: actionTypes.save,
            payload: item,
        });

    /**
     * Dispatches a sincronize action.
     */
    const onSincronize = () =>
        dispatch({
            type: actionTypes.sincronize,
        });

    React.useEffect(() => {
        try {
            const localStorageItem = localStorage.getItem(itemName);
            let parsedItem;

            if (!localStorageItem) {
                localStorage.setItem(itemName, JSON.stringify(initialValue));
                parsedItem = initialValue;
            } else {
                parsedItem = JSON.parse(localStorageItem);
            }
            onSuccess(parsedItem);
        } catch (error) {
            onError(error);
        }
    }, []);

    /**
     * Saves a new item to both localStorage and the state.
     * @param {any} newItem The new item to save.
     */
    const saveItem = (newItem) => {
        try {
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(itemName, stringifiedItem);
            onSave(newItem);
        } catch (error) {
            onError(error);
        }
    };

    /**
     * Triggers the synchronization state to force a data reload.
     */
    const sincronizeItem = () => {
        onSincronize();
    };

    return {
        item,
        saveItem,
        loading,
        error,
        sincronizeItem,
    };
}

export { useLocalStorage };
