import { createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const adminList = ["Liam", "Jhonny"];
const AuthContext = createContext(); // renderiza

/*  */
function AuthRoute({ children }) {
    const { user, login, logout } = useContext(AuthContext); // ProfilePage = {children}

    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
}
/*  */
function useAuth() {
    const auth = useContext(AuthContext);
    return auth;
}
/* main element */
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

    return (
        <AuthContext.Provider value={(user, login, logout)}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthRoute, useAuth, AuthProvider };
