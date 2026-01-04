import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

/**
 * Wrapper para React Portals.
 * Permite renderizar contenido fuera de la jerarquía DOM principal del componente padre,
 * útil para modales, tooltips y popups que deben estar sobre todo el contenido.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido a mostrar dentro del modal.
 * @returns {React.ReactPortal} Portal de React.
 */
function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="ModalBackground">
      {children}
    </div>,
    document.getElementById('modal')
  );
}

export { Modal };
