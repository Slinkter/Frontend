import { createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const adminList = ["Liam", "Jhonny"];

const AuthContext = createContext();

/*  */
function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const login = ({ username }) => {
        const isAdmin = adminList.find((admin) => admin === username); // return true o undefined
        const usuario = { username, isAdmin };
        setUser(usuario);
        navigate("/profile");
    };

    const logout = () => {
        setUser(null);
        navigate("/");
    };

    const globalValues = (user, login, logout);

    return (
        <AuthContext.Provider value={globalValues}>
            {children}
        </AuthContext.Provider>
    );
}

function AuthRoute({ children }) {
    const { user } = useContext(AuthContext); // ProfilePage = {children}

    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
}

function useAuth() {
    const auth = useContext(AuthContext);
    return auth;
}

export { AuthRoute, useAuth, AuthProvider };
