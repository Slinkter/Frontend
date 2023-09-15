import { useState, createContext } from "react";
import { initialState } from "./db";
// Create context
const MyContextStore = createContext();
//Contenador Componentes
const ThemeComponent = ({ children }) => {
    const [session, setSession] = useState(initialState.session);
    const values = { session, setSession };
    return (
        <MyContextStore.Provider value={values}>
            {children}
        </MyContextStore.Provider>
    );
};
export { MyContextStore };
export { ThemeComponent };
