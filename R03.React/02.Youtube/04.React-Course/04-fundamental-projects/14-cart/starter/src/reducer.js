import {
    CLEAR_CART,
    DECREASE,
    DISPLAY_ITEMS,
    INCREASE,
    LOADING,
    REMOVE,
} from "./actions";
const reducer = (state, action) => {
    switch (action.type) {
        case CLEAR_CART: {
            return state;
        }
        case REMOVE: {
            return state;
        }
        case INCREASE: {
            return state;
        }
        case DECREASE: {
            return state;
        }
        case LOADING: {
            return state;
        }
        case DISPLAY_ITEMS: {
            return state;
        }

        default:
            return state;
    }
};
export default reducer;
