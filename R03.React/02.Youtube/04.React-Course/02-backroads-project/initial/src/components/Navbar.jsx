import React from "react";
import { pageLinks, socialLinks } from "../data";
import logo from "../images/logo.svg";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-center">
                <div className="nav-header">
                    <img src={logo} alt="logo" className="nav-logo" />
                    <button
                        id="nav-toggle"
                        type="button"
                        className="nav-toggle"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                <PageLinks parentClass="nav-links" itemClass="nav-link" />

                <ul className="nav-icons">
                    {socialLinks.map((link) => {
                        return (
                            <SocialLink
                                {...link}
                                key={link.id}
                                itemClass="nav-icon"
                            />
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

const PageLinks = ({ parentClass, itemClass }) => {
    return (
        <ul className={parentClass} id="nav-links">
            {pageLinks.map((link) => {
                return (
                    <PageLink key={link.id} link={link} itemClass={itemClass} />
                );
            })}
        </ul>
    );
};

const PageLink = ({ link, itemClass }) => {
    return (
        <li key={link.id}>
            <a href={link.href} className={itemClass}>
                {link.text}
            </a>
        </li>
    );
};

const SocialLink = ({ itemClass, href, icon }) => {
    return (
        <li>
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={itemClass}
            >
                <i className={icon}></i>
            </a>
        </li>
    );
};
