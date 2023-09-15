import { createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
//1. db
const adminList = ["Liam", "Jhonny"];
//2. hook
const AuthContext = createContext();
//3. componet
function AuthProvider(props) {
  const { children } = props; // menu y routes
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  //
  const login = ({ username }) => {
    const isAdmin = adminList.find((admin) => admin === username); // return true o undefined
    setUser({ username, isAdmin });
    navigate("/profile");
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  const auth = { user, login, logout };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
//4.verifica que el usuario no sea null
// no va a acceder a esta ruta si el usuario es null
// se re-direcciona a login
function AuthRoute(props) {
  const { children } = props; // ProfilePage = {children}
  const auth = useContext(AuthContext);
  console.log(auth);
  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return children;
}
//5.
function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}

export { AuthProvider, AuthRoute, useAuth };
