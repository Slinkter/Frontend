import React from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Navbar = () => {
    //
    const { user, login, logout } = useContext(UserContext);
    //
    const newUser = user;
    //
    const navStyle = "navbar navbar-dark bg-dark mb-4";
    return (
        <React.Fragment>
            <nav className={navStyle}>
                <div className="container">
                    <span className="navbar-brand">
                        <h2>
                            {newUser ? `hola ${newUser.name} ` : "Bienvenido"}
                        </h2>
                    </span>
                    {newUser ? (
                        <button className="btn btn-primary" onClick={logout}>
                            Cerrar session
                        </button>
                    ) : (
                        <button className="btn btn-secondary" onClick={login}>
                            Iniciar session
                        </button>
                    )}
                </div>
            </nav>
        </React.Fragment>
    );
};

export default Navbar;
