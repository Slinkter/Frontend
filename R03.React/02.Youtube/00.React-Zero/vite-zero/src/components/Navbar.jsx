import React, { useContext } from "react";
import { ThemeContextUser } from "../context/ContextUser";

const Navbar = () => {
  const { user, logIn, logOut } = useContext(ThemeContextUser);

  return (
    <React.Fragment>
      <nav className="border-b-orange-600 border-2 ">
        <div className="flex flex-row justify-between items-center p-4">
          <span>
            <h2> {user ? `hola ${user?.name}` : "Bienvenido"} </h2>
          </span>
          {user ? (
            <button className="btn-default " onClick={logOut}>
              Cerrar Session{" "}
            </button>
          ) : (
            <button className="btn-default " onClick={logIn}>
              Iniciar sesion
            </button>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
