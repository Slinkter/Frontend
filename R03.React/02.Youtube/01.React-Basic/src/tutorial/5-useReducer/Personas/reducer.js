import { data } from "../../../db/data";
import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from "./action";

const reducer = (state, action) => {
    /*  */
    if (action.type === CLEAR_LIST) {
        return { ...state, people: [] };
    }
    /*  */
    if (action.type === RESET_LIST) {
        return { ...state, people: data };
    }
    /*  */
    if (action.type === REMOVE_ITEM) {
        let newPeople = state.people.filter(
            (person) => person.id !== action.payload.id
        );
        return { ...state, people: newPeople };
    }

    throw new Error(`no matchin ${action.type}  - action type`);

    return state;
};

export { reducer };
