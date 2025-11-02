import React from "react";
import { TodoContext } from "../TodoContext/index.jsx";
import { useStorageListener } from "../../hook/useStorageListener.js";
//
import "./ChangeAlert.css";

/**
 * @file ChangeAlert.jsx
 * @description Alerts the user if there are changes in localStorage from another tab/window.
 * @returns {JSX.Element} - The ChangeAlert component.
 */

function ChangeAlert() {
  const { sincronizeTodos } = React.useContext(TodoContext);
  const { show, toggleShow } = useStorageListener(sincronizeTodos);

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
            onClick={toggleShow}
          >
            Yes!
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export { ChangeAlert };


