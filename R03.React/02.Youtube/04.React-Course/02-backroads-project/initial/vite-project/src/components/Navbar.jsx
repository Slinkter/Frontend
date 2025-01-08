import React from "react";

import logo from "../assets/images/logo.svg";

const pageLinks = [
    { id: 1, href: "#home", text: "home" },
    { id: 2, href: "#about", text: "about" },
    { id: 3, href: "#services", text: "services" },
    { id: 4, href: "#tours", text: "tours" },
];

const Navbar = () => {
    return (
        <>
            <img src={logo} alt="backroads" className="nav-logo" />
            {pageLinks.map((link) => {
                return (
                    <li key={link.id}>
                        <a href={link.href} className="nav-link">
                            {link.text}
                        </a>
                    </li>
                );
            })}
        </>
    );
};

export default Navbar;
