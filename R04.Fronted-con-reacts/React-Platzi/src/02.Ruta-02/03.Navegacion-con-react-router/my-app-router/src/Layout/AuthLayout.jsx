import React, { createContext, useContext, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { StickyNavbar } from "./Navbar";

const adminList = ["admin1", "admin2"];
const AuthContext = createContext();

function AuthRoute({ children }) {
    const auth = useContext(AuthContext);
    if (!auth.user) {
        return <Navigate to="/profile" />;
    }
    return children;
}
/* Navbar,....,....  */
function useAuth() {
    const auth = useContext(AuthContext);
    return auth;
}

const AuthLayout = () => {
    const [user, setUser] = useState(null); // Inicialmente no hay usuario autenticado
    const goTo = useNavigate();

    const login = ({ username }) => {
        // Aquí deberías implementar tu lógica de autenticación
        const isAdmin = adminList.find((person) => person === username);
        const userLogin = { username, isAdmin };
        setUser(userLogin);
        goTo("/login");
    };

    const logout = () => {
        setUser(null);
        goTo("/logout");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <StickyNavbar />
            <div className="border-8 border-purple-500 h-dvh container mx-auto ">
                <Outlet /> {/* Outlet para renderizar rutas hijas */}
            </div>
            <div>footer</div>
        </AuthContext.Provider>
    );
};

export default AuthLayout;
export { useAuth, AuthRoute };
