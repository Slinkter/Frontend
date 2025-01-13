import React from "react";
import { pageLinks } from "../data";

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
export default PageLinks;

const PageLink = ({ link, itemClass }) => {
    return (
        <li key={link.id}>
            <a href={link.href} className={itemClass}>
                {link.text}
            </a>
        </li>
    );
};
