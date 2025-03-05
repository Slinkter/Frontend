import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from "./actions";
import { data } from "../../../data";

const reducer = (state, action) => {
    if (action.type === REMOVE_ITEM) {
        let newPeople = state.people.filter(
            (person) => person.id !== action.payload.id
        );

        return { ...state, people: newPeople };
    }
    if (action.type === CLEAR_LIST) {
        return { ...state, people: [] };
    }
    if (action.type === RESET_LIST) {
        return { ...state, people: data };
    }
    // return state;
    throw new Error(`No matching "${action.type}" - action type`);
};

export default reducer;
