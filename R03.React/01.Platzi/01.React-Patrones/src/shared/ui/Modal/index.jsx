import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

/**
 * @file Modal.jsx
 * @description A modal component that renders its children into a React Portal.
 * This is used to display content on top of the main application, like the TodoForm.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the modal.
 * @returns {ReactDOM.Portal} - A React portal containing the modal content.
 */
function Modal({ children }) {
  // Use a portal to render the modal outside the main DOM hierarchy
  return ReactDOM.createPortal(
    <div className="ModalBackground">
      {children}
    </div>,
    document.getElementById('modal') // The DOM node where the modal will be mounted
  );
}

export { Modal };

