import React from "react";
import { useAuth } from "../provider/auth";

const LogoutPage = () => {
    const auth = useAuth();

    const logout = (e) => {
        e.preventDefault();
        auth.logout();
    };
    return (
        <div className="container">
            <h1>Logout </h1>
            <form onSubmit={logout}>
                <label> Deseas salir ? </label>
                <br />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default LogoutPage;
