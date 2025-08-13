import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from "./actions";
import { data } from "../../../data";

/**
 * Reducer para manejar acciones sobre la lista de personas.
 * @param {Object} state - Estado actual.
 * @param {Object} action - Acción con tipo y payload.
 * @returns {Object} Nuevo estado.
 */
const reducer = (state, action) => {
    switch (action.type) {
        case REMOVE_ITEM: {
            const filteredPeople = state.people.filter(
                (person) => person.id !== action.payload.id
            );
            return { ...state, people: filteredPeople };
        }

        case CLEAR_LIST:
            return { ...state, people: [] };

        case RESET_LIST:
            return { ...state, people: data };

        default:
            // Manejo explícito de errores para tipos de acción desconocidos
            throw new Error(`No matching "${action.type}" - action type`);
    }
};

export default reducer;
