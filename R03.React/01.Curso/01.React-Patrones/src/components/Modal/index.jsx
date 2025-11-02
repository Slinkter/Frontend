import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

/**
 * @file Modal.jsx
 * @description A modal component that renders its children into a portal.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the modal.
 * @returns {ReactDOM.Portal} - A React portal containing the modal content.
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

