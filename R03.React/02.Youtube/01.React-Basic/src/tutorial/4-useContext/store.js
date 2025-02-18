import { useState, createContext } from "react";
import { initialState } from "./db";


//Contenador Componentes
const ThemeComponent = ({ children }) => {
    //hook
    const [session, setSession] = useState(initialState.session);
    // props context
    const props = { session, setSession };
    return (
        <MyContextStore.Provider value={props}>
            {children}
        </MyContextStore.Provider>
    );
};
export { ThemeComponent };


// Create context
const MyContextStore = createContext();
export { MyContextStore };