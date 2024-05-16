import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../provider/auth";
import { routes } from "../db/pathroutes";

const Menu = () => {
  //
  const auth = useAuth();
  //
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "red" : "blue",
  });

  return (
    <nav>
      <ul className="nav justify-content-center">
        {routes.map((route) => {
          if (route.publicOnly && auth.user) return null; //   r4  : no mostrar
          if (route.private && !auth.user) return null; // r3 y r5 : no mostrar
          // renderizar
          return (
            <li key={route.to} className="nav-item">
              <NavLink className="nav-link" to={route.to} style={navLinkStyle}>
                {route.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
