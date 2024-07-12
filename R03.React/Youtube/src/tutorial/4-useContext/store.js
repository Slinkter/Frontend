import { useState, createContext } from "react";
import { initialState } from "./db";
// Create context
const MyContextStore = createContext();
//Contenador Componentes
const ThemeComponent = ({ children }) => {
    const [session, setSession] = useState(initialState.session);
    const props = { session, setSession };
    return (
        <MyContextStore.Provider value={props}>
            {children}
        </MyContextStore.Provider>
    );
};
export { MyContextStore };
export { ThemeComponent };
