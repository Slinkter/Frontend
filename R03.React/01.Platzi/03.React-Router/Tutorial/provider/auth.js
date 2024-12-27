import { createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const admins = ["Liam", "Jhonny"];

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = ({ username }) => {
        const isAdmin = admins.find((admin) => admin === username); // return true o false(undefined)
        const usuario = { username, isAdmin };
        setUser(usuario);
        navigate("/profile");
    };

    const logout = () => {
        setUser(null);
        navigate("/");
    };

    const props = (user, login, logout);

    return (
        <AuthContext.Provider value={props}>{children}</AuthContext.Provider>
    );
}

function AuthRoute({ children }) {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
}

function useAuth() {
    const auth = useContext(AuthContext);
    return auth;
}

export { AuthRoute, useAuth, AuthProvider };
