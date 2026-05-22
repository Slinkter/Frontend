import React from "react";
import { useTodoContext } from "@/entities/todo";
import { useStorageListener } from "@/shared/lib";
import "./ChangeAlert.css";

/**
 * @file ChangeAlert.jsx
 * @description Alerta al usuario si el localStorage ha cambiado en otra pestaña.
 * @returns {JSX.Element | null}
 */
function ChangeAlert() {
    const { sincronizeTodos } = useTodoContext();

    const f_sincronize = () => {
        sincronizeTodos();
    };

    const { show, f_toggleShow } = useStorageListener(f_sincronize);

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
                        onClick={f_toggleShow}
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
