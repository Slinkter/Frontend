import React from "react";
import { useStorageListener } from "./useStorageListener";
import "./ChangeAlert.css";

/**
 * A functional component that displays an alert to the user when
 * changes to TODOs are detected in another browser tab or window.
 */
function ChangeAlert({ synchronize }) {
    // Custom Hook: Escucha cambios en localStorage y maneja el estado de alerta
    const { hasChanges, onSync } = useStorageListener(synchronize);

    // Guard Clause: No renderiza nada si no hay cambios externos detectados
    if (!hasChanges) {
        return null;
    }

    return (
        <div className="ChangeAlert-bg">
            <div className="ChangeAlert-container">
                <p>
                    Parece que cambiaste tus TODOs en otra pestaña o ventana
                    del navegador.
                </p>
                <p>¿Quieres sincronizar tus TODOs?</p>
                <button
                    className="TodoForm-button TodoForm-button--add"
                    onClick={onSync}
                >
                    Yes!
                </button>
            </div>
        </div>
    );
}

export { ChangeAlert };
