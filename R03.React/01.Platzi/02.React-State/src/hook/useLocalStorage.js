import { useEffect, useReducer } from "react";

const ActionTypes = {
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
    SAVE: "SAVE",
    SYNCHRONIZE: "SYNCHRONIZE",
};

// [Configuración: 6.1] Estado inicial perezoso
const initialState = (initialValue) => ({
    hasError: false,
    isLoading: true,
    item: initialValue,
    isSynchronized: true,
});

// Reducer: Lógica pura para transformar el estado basado en acciones
const reducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SUCCESS:
            return {
                ...state,
                hasError: false,
                isLoading: false,
                item: action.payload,
                isSynchronized: true,
            };
        case ActionTypes.ERROR:
            return { ...state, hasError: true };
        case ActionTypes.SAVE:
            return { ...state, item: action.payload };
        case ActionTypes.SYNCHRONIZE:
            return { ...state, isLoading: true, isSynchronized: false };
        default:
            return state;
    }
};

/**
 * [Ejecución: 6] Hook useLocalStorage.
 * Gestiona la persistencia física de los datos.
 */
function useLocalStorage(itemName, initialValue) {
    // [Ejecución: 6.2] Inicialización del Reducer
    const [state, dispatch] = useReducer(reducer, initialValue, initialState);
    const { hasError, isLoading, item } = state;

    // Action Creators
    const onError = (error) =>
        dispatch({ type: ActionTypes.ERROR, payload: error });
    const onSuccess = (itemValue) =>
        dispatch({ type: ActionTypes.SUCCESS, payload: itemValue });
    const onSave = (itemValue) =>
        dispatch({ type: ActionTypes.SAVE, payload: itemValue });
    const onSynchronize = () => dispatch({ type: ActionTypes.SYNCHRONIZE });

    // [Ejecución: 7] Efecto de Carga (Post-Render)
    useEffect(() => {
        setTimeout(() => {
            try {
                const localStorageItem = localStorage.getItem(itemName);
                let parsedItem;

                if (!localStorageItem) {
                    localStorage.setItem(
                        itemName,
                        JSON.stringify(initialValue),
                    );
                    parsedItem = initialValue;
                } else {
                    parsedItem = JSON.parse(localStorageItem);
                }
                onSuccess(parsedItem);
            } catch (error) {
                onError(error);
            }
        }, 1000);
    }, [itemName, initialValue]);

    const saveItem = (newItem) => {
        try {
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(itemName, stringifiedItem);
            onSave(newItem);
        } catch (error) {
            onError(error);
        }
    };

    const synchronizeItem = () => {
        onSynchronize();
    };

    return {
        item,
        saveItem,
        isLoading,
        hasError,
        synchronizeItem,
    };
}

export { useLocalStorage };
