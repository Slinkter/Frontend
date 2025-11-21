import React from "react";
import { TodoContext } from "../TodoContext/index.jsx";
import { useStorageListener } from "../../hook/useStorageListener.js";
import "./ChangeAlert.css";

/**
 * @file ChangeAlert.jsx
 * @description A component that alerts the user if `localStorage` has changed in another browser tab/window.
 * It provides an option to synchronize the state.
 * @returns {JSX.Element | null} - The ChangeAlert component, or `null` if there are no changes.
 */
function ChangeAlert() {
  // Consume the context to get the synchronization function
  const { sincronizeTodos } = React.useContext(TodoContext);
  // Use the custom hook to listen for storage changes
  const { show, toggleShow } = useStorageListener(sincronizeTodos);

  // If 'show' is true, render the alert
  if (show) {
    return (
      <div className="ChangeAlert-bg">
        <div className="ChangeAlert-container">
          <p>
            Parece que cambiaste tus TODOs en otra pestaña o ventana del
            navegador.
          </p>
          <p>¿Quieres sincronizar tus TODOs?</p>
          <button
            className="TodoForm-button TodoForm-button--add"
            onClick={toggleShow} // When clicked, synchronizes and hides the alert
          >
            Yes!
          </button>
        </div>
      </div>
    );
  } else {
    // Otherwise, render nothing
    return null;
  }
}

export { ChangeAlert };


