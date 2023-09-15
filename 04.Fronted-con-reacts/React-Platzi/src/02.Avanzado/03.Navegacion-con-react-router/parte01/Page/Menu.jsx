import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../provider/auth";

const routes = [];

const r1 = {
  to: "/",
  text: "Home",
  private: false,
};
const r2 = {
  to: "/blog",
  text: "Blog",
  private: false,
};
const r3 = {
  to: "/profile",
  text: "Profile",
  private: true,
};
const r4 = {
  to: "/login",
  text: "Login",
  private: false,
  publicOnly: true,
};
const r5 = {
  to: "/logout",
  text: "Logout",
  private: true,
};

routes.push(r1); // home
routes.push(r2); // blog
routes.push(r3); // profile
routes.push(r4); // login
routes.push(r5); // logout

const Menu = () => {
  //
  const auth = useAuth();
  //
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "red" : "blue",
  });

  return (
    <nav>
      <ul class="nav justify-content-center">
        {routes.map((route) => {
          if (route.publicOnly && auth.user) return null; //   r4  : no mostrar
          if (route.private && !auth.user) return null; // r3 y r5 : no mostrar
          return (
            <li key={route.to} className="nav-item">
              <NavLink style={navLinkStyle} to={route.to} className="nav-link">
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
