import React from "react";
import ReactDOM from "react-dom";
import "../style/modal.css";

/**
 * A modal component that renders its children into a different DOM node using a React Portal.
 * This is used to display content on top of the rest of the application.
 *
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @returns {React.ReactPortal} A React Portal that renders the modal.
 * @see The host HTML file (e.g., `index.html`) must contain an element with the id 'modal'.
 */
function Modal({ children }) {
    const element = <div className="ModalBackground">{children}</div>;
    const conexionHtml = document.getElementById("modal");
    return ReactDOM.createPortal(element, conexionHtml);
}

export { Modal };
