import React from "react";
import CheckSVG from "./check.svg?react";
import DeleteSVG from "./delete.svg?react";
import "./TodoIcon.css";

/**
 * An object mapping icon types to their respective SVG components and styles.
 * @type {Object.<string, function(string): React.ReactElement>}
 */
const iconTypes = {
  /**
   * Returns a checkmark SVG icon.
   * @param {string} color The fill color for the SVG.
   * @returns {React.ReactElement} The checkmark SVG.
   */
  check: (color) => (
    <CheckSVG className="Icon-svg Icon-svg--check" fill={color} />
  ),
  /**
   * Returns a delete/close SVG icon.
   * @param {string} color The fill color for the SVG.
   * @returns {React.ReactElement} The delete SVG.
   */
  delete: (color) => (
    <DeleteSVG className="Icon-svg Icon-svg--delete" fill={color} />
  ),
};

/**
 * A generic icon component that renders different SVG icons based on the `type` prop.
 * It also handles click events and applies a custom color.
 *
 * @param {object} props The component's properties.
 * @param {'check' | 'delete'} props.type The type of icon to render ('check' or 'delete').
 * @param {string} [props.color='gray'] The color of the icon. Defaults to 'gray'.
 * @param {function(): void} props.onClick A callback function to be called when the icon is clicked.
 * @returns {React.ReactElement} The rendered icon component.
 */
function TodoIcon({ type, color = "gray", onClick }) {
  return (
    <span
      className={`Icon-container Icon-container--${type}`}
      onClick={onClick}
    >
      {iconTypes[type](color)}
    </span>
  );
}

export { TodoIcon };
