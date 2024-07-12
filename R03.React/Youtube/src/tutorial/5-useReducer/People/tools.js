const reducer = (state, action) => {
    switch (action.type) {
        //------------------------->
        case types.addItem: {
            const newPeople = [...state.people, action.payload]; // action.payload =   array
            const newState = {
                ...state,
                people: newPeople,
                isModalOpen: true,
                modalContent: "item added",
            };
            return newState;
        }
        //------------------------->
        case types.noValue: {
            const newState = {
                ...state,
                isModalOpen: true,
                modalContent: "please enter value",
            };
            return newState;
        }
        //------------------------->
        case types.closeModal: {
            const newState = {
                ...state,
                isModalOpen: false,
            };
            return newState;
        }
        //------------------------->
        case types.removeItem: {
            const newPeople = state.people.filter(
                (person) => person.id !== action.payload
            );

            const newState = {
                ...state,
                people: newPeople,
                isModalOpen: true,
                modalContent: "item deleted",
            };
            return newState;
        }
        //------------------------->
        default:
            return state;
    }
};
const defaultState = {
    people: [],
    isModalOpen: false,
    modalContent: "",
};

const types = {
    addItem: "ADD_ITEM",
    noValue: "NO_VALUE",
    closeModal: "CLOSE_MODAL",
    removeItem: "REMOVE_ITEM",
};

export { reducer, defaultState, types };
