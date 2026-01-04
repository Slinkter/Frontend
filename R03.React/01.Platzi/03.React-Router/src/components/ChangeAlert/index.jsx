import React from "react";
import { useStorageListener } from "./useStorageListener";
import "../../styles/ChangeAlert.css";

/**
 * Alerta flotante (Modal-like) que notifica al usuario si los datos cambiaron externamente.
 * Utiliza el custom hook `useStorageListener` para detectar eventos del sistema.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.sincronize - Función para resincronizar el estado con LocalStorage.
 * @returns {JSX.Element|null} UI de alerta o null si no hay cambios.
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
