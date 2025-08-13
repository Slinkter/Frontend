import { createContext, useState, useContext } from "react";
import NavLinks from "./NavLinks";

// 1. Crear el contexto
export const NavbarContext = createContext();

// 2. Hook personalizado para consumir el contexto
export const useAppContext = () => useContext(NavbarContext);

const Navbar = () => {
    // Estado del usuario (simulación de sesión)
    const [user, setUser] = useState({ name: "bob" });

    // Función para cerrar sesión
    const logout = () => setUser(null);

    return (
        // 3. Proveer el contexto a los componentes hijos
        <NavbarContext.Provider value={{ user, logout }}>
            <nav className="navbar">
                <h5>CONTEXT API</h5>
                <NavLinks />
            </nav>
        </NavbarContext.Provider>
    );
};

export default Navbar;
