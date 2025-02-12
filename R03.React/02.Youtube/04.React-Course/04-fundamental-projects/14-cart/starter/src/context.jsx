import { createContext, useReducer } from "react";
import reducer from "./reducer";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
};

const useGlovalContext = () => {};
