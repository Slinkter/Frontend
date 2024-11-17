import React, { useReducer } from "react";

function useLocalStorage(itemName, initialValue) {
    // -> Object Json
    const actionTypes = {};
    actionTypes.error = "ERROR";
    actionTypes.success = "SUCCESS";
    actionTypes.save = "SAVE";
    actionTypes.sincronize = "SINCRONIZE";
    // initialValue = []
    const initialState = ({ initialValue }) => ({
        error: false,
        loading: true,
        item: initialValue,
        sincronizedItem: true,
    });
    // -> Funcion
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
    // -> funcion -- no entiendo
    const reducer = (state, action) => {
        const updateState = reducerObj(state, action.payload)[action.type];
        return updateState || state;
    };

    //
    const [state, dispatch] = useReducer(
        reducer,
        initialState({ initialValue })
    );
    //
    const { sincronizedItem, error, loading, item } = state;

    // ACTION CREATORS
    // funcion
    const onError = (error) =>
        dispatch({
            type: actionTypes.error,
            payload: error,
        });
    // funcion
    const onSuccess = (item) =>
        dispatch({
            type: actionTypes.success,
            payload: item,
        });
    // funcion
    const onSave = (item) =>
        dispatch({
            type: actionTypes.save,
            payload: item,
        });
    // funcion
    const onSincronize = () =>
        dispatch({
            type: actionTypes.sincronize,
        });

    React.useEffect(() => {
        try {
            let parsedItem;
            const localStorageItem = localStorage.getItem(itemName);
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
    // [initialValue, itemName, sincronizedItem]

    // funcion
    const saveItem = (newItem) => {
        try {
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(itemName, stringifiedItem);
            onSave(newItem);
        } catch (error) {
            onError(error);
        }
    };

    const sincronizeItem = () => {
        onSincronize();
    };

    return {
        error,
        loading,
        item,
        saveItem,
        sincronizeItem,
    };
}

export { useLocalStorage };
