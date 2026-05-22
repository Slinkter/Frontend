import { useReducer } from "react";

// Constantes de tipos de acción para evitar typos
const ActionTypes = {
    OPEN: "OPEN",
    CLOSE: "CLOSE",
};

// Estado inicial del modal
const initialState = {
    isOpenModal: false,
};

// Reducer: Maneja la visibilidad binaria del modal
const reducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.OPEN:
            return { ...state, isOpenModal: true };
        case ActionTypes.CLOSE:
            return { ...state, isOpenModal: false };
        default:
            return state;
    }
};

/**
 * Custom hook to manage the state of the modal.
 */
function useModal() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { isOpenModal } = state;

    // Dispatcher: Cambia el estado del modal según el valor booleano recibido
    const setIsOpenModal = (isOpen) => {
        dispatch({ type: isOpen ? ActionTypes.OPEN : ActionTypes.CLOSE });
    };

    return { isOpenModal, setIsOpenModal };
}

export { useModal };
