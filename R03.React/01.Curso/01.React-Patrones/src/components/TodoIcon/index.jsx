import React from "react";
import { ReactComponent as CheckSVG } from "./check.svg";
import { ReactComponent as DeleteSVG } from "./delete.svg";
import "./TodoIcon.css";

/**
 * @file TodoIcon.jsx
 * @description A generic icon component for TODO actions.
 * It dynamically renders an SVG based on the `type` prop.
 * @param {object} props - The component props.
 * @param {string} props.type - The type of the icon (e.g., "check", "delete").
 * @param {string} [props.color="gray"] - The color of the icon.
 * @param {function} props.onClick - The function to call when the icon is clicked.
 * @returns {JSX.Element} - The TodoIcon component.
 */

// A dictionary to map icon types to their respective SVG components
const iconTypes = {
  check: (color) => (
    <CheckSVG className="Icon-svg Icon-svg--check" fill={color} />
  ),
  delete: (color) => (
    <DeleteSVG className="Icon-svg Icon-svg--delete" fill={color} />
  ),
};

function TodoIcon({ type, color = "gray", onClick }) {
  return (
    <span
      className={`Icon-container Icon-container--${type}`}
      onClick={onClick}
    >
      {/* Render the icon by calling the function from the iconTypes dictionary */}
      {iconTypes[type](color)}
    </span>
  );
}

export { TodoIcon };

