import React from "react";
import PageLinks from "./PageLinks";
import { socialLinks } from "../data";

const Footer = () => {
    return (
        <footer className="section footer">
            <PageLinks parentClass="footer-links" itemClass="footer-link" />
            <ul className="footer-icons">
                {socialLinks.map((link) => {
                    return (
                        <SocialLink
                            key={link.id}
                            {...link}
                            itemClass="footer-icon"
                        />
                    );
                })}
            </ul>
            <p className="copyright">
                copyright &copy; Backroads travel tours company
                <span id="date">{new Date().getFullYear()}</span>. all rights
                reserved
            </p>
        </footer>
    );
};
export default Footer;

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
