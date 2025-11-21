import { useReducer } from "react";

const initialState = {
    openModal: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "OPEN_MODAL":
            return {
                ...state,
                openModal: true,
            };
        case "CLOSE_MODAL":
            return {
                ...state,
                openModal: false,
            };
        default:
            return state;
    }
};

function useModal() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const openModal = state.openModal;

    const setOpenModal = (value) => {
        if (value) {
            dispatch({ type: "OPEN_MODAL" });
        } else {
            dispatch({ type: "CLOSE_MODAL" });
        }
    };

    return { openModal, setOpenModal };
}

export { useModal };
