import React from "react";
import { useStorageListener } from "./useStorageListener";
import "./ChangeAlert.css";

/**
 * A functional component that displays an alert to the user when
 * changes to TODOs are detected in another browser tab or window.
 * It provides an option to synchronize the data.
 *
 * @param {object} props The component's properties.
 * @param {function(): void} props.sincronize A callback function to trigger the data synchronization.
 * @returns {React.ReactElement | null} The alert UI if `show` is true, otherwise `null`.
 */
function ChangeAlert({ sincronize }) {
    const { show, toggleShow } = useStorageListener(sincronize);

    if (show) {
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
