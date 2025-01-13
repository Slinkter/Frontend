import { data } from "../../../data";
import { CLEAR_LIST, REMOVE_ITEM, RESET_LIST } from "./actions";

const reducer = (state, action) => {
    switch (action.type) {
        case REMOVE_ITEM: {
            let list = state.people.filter(
                (person) => person.id !== action.payload.id
            );
            return { ...state, people: [...list] };
        }
        case CLEAR_LIST:
            return { ...state, people: [] };
        case RESET_LIST:
            return { ...state, people: data };
        default:
            return state;
    }
};
export default reducer;
