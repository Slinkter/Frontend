import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

/**
 * A functional component that renders a modal dialog using `ReactDOM.createPortal`.
 * This allows the modal content to be rendered outside the normal DOM hierarchy,
 * which is useful for managing z-index, overflow, and accessibility.
 *
 * @param {object} props The component's properties.
 * @param {React.ReactNode} props.children The child elements to be rendered inside the modal.
 * @returns {React.ReactPortal} A React Portal containing the modal background and its children.
 */
function Modal({ children }) {
    return ReactDOM.createPortal(
        <div className="ModalBackground">{children}</div>,
        document.getElementById("modal")
    );
}

export { Modal };
