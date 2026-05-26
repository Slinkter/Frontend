/**
 * @file Modal.jsx
 * @description Contenedor de modal basado en React Portal para superposiciones de la aplicación.
 * @module components
 */

import React from "react";
import ReactDOM from "react-dom";
import "../style/modal.css";

/**
 * Un componente de portal de modal para renderizar hijos fuera de la jerarquía principal del DOM.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido del modal.
 * @returns {React.ReactPortal} El contenido del modal renderizado en el portal del DOM.
 * @remarks 
 * - Requiere un `<div id="modal"></div>` en index.html.
 * - Los estilos para la superposición/fondo se gestionan en modal.css.
 */
const Modal = ({ children }) => {
    const modalContent = <div className="ModalBackground">{children}</div>;
    const modalRoot = document.getElementById("modal");

    if (!modalRoot) {
        console.warn("No se encontró el elemento raíz del modal con id 'modal' en el DOM.");
        return null;
    }

    return ReactDOM.createPortal(modalContent, modalRoot);
};

export { Modal };
