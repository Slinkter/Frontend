/**
 * @file A reusable and dynamic icon component for the application.
 * @description This component serves as a generic wrapper for displaying different SVG icons
 * based on a `type` prop. It uses a dictionary-based approach to map icon types
 * to their corresponding SVG components, making it easily extensible.
 * The component also accepts `color` and `onClick` props to customize its appearance and behavior.
 */

import React from "react";
import CheckSVG from "./check.svg?react";
import DeleteSVG from "./delete.svg?react";
import "./TodoIcon.css";

/**
 * A dictionary that maps a string identifier (icon type) to a function
 * that returns the corresponding SVG component. This pattern allows for
 * easy addition of new icons without changing the main component logic.
 * @type {{ [key: string]: (color: string) => JSX.Element }}
 */
const iconTypes = {
    /**
     * Renders the Check (completion) icon.
     * @param {string} color The fill color of the SVG.
     * @returns {JSX.Element} The Check SVG component.
     */
    check: (color) => (
        <CheckSVG className="Icon-svg Icon-svg--check" fill={color} />
    ),
    /**
     * Renders the Delete icon.
     * @param {string} color The fill color of the SVG.
     * @returns {JSX.Element} The Delete SVG component.
     */
    delete: (color) => (
        <DeleteSVG className="Icon-svg Icon-svg--delete" fill={color} />
    ),
};

/**
 * A dynamic icon component that renders different SVGs based on the `type` prop.
 *
 * @param {object} props The properties for the component.
 * @param {string} props.type The type of icon to display. Must be a key in the `iconTypes` object (e.g., "check", "delete").
 * @param {string} [props.color="gray"] The fill color for the SVG icon. Defaults to "gray".
 * @param {function} props.onClick The event handler to be executed when the icon is clicked.
 * @returns {JSX.Element} A `<span>` element wrapping the dynamically selected SVG icon.
 */
function TodoIcon({ type, color = "gray", onClick }) {
    return (
        <span
            className={`Icon-container Icon-container--${type}`}
            onClick={onClick}
        >
            {/*
             * The icon is rendered by calling the function associated with the `type` prop
             * from the `iconTypes` dictionary, passing the color to it.
             */}
            {iconTypes[type](color)}
        </span>
    );
}

export { TodoIcon };