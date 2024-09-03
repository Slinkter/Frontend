import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";

function Modal({ children }) {
  const element = <div className="ModalBackground">{children}</div>;
  const conexionHtml = document.getElementById("modal");
  return ReactDOM.createPortal(element, conexionHtml);
}

export { Modal };
