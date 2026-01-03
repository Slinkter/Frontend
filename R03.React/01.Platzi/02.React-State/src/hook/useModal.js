import { useReducer } from "react";

/**
 * The initial state for the modal reducer.
 * @type {{openModal: boolean}}
 */
const initialState = {
    openModal: false,
};

/**
 * Reducer for managing the modal's visibility state.
 * @param {object} state The current state.
 * @param {{type: string}} action The dispatched action.
 * @returns {object} The new state.
 */
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

/**
 * Custom hook to manage the state of the modal.
 *
 * @returns {{
 *  openModal: boolean,
 *  setOpenModal: function(boolean): void
 * }} An object containing the modal's visibility state and a function to update it.
 */
function useModal() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { openModal } = state;

    /**
     * Opens or closes the modal.
     * @param {boolean} value `true` to open the modal, `false` to close it.
     */
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
