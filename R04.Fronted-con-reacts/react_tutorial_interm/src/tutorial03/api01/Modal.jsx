import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

function Modal({ children }) {
  const element = <div className="modal">{children}</div>;
  const id = document.getElementById("modal");
  return ReactDOM.createPortal(element, id);
}

export default Modal;
