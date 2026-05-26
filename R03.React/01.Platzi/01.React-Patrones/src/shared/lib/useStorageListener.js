/**
 * @file Este hook personalizado implementa la sincronización entre pestañas para el `localStorage`.
 * @description `useStorageListener` escucha el evento `storage` en el objeto `window`.
 *
 * NOTA TÉCNICA: Este hook actúa como un "Higher-Order Hook". Recibe una función de
 * sincronización y mejora la funcionalidad de la aplicación sin acoplarse a la
 * lógica de negocio del componente.
 */

import React from "react";
import { STORAGE_KEY_V1 } from "@/shared/lib/constants";

/**
 * Un hook personalizado que escucha los cambios en `localStorage` desde otras pestañas.
 *
 * @param {function} f_sincronize - Callback para volver a sincronizar el estado.
 * @param {string} storageKey - La clave de localStorage a monitorizar.
 * @returns {{show: boolean, f_toggleShow: function}} Estado y función para gestionar la alerta.
 */
function useStorageListener(f_sincronize, storageKey = STORAGE_KEY_V1) {
    const [storageChange, setStorageChange] = React.useState(false);

    React.useEffect(() => {
        const listener = (change) => {
            if (change.key === storageKey) {
                console.log(
                    `Cambios detectados en otra pestaña para ${storageKey}`,
                );
                setStorageChange(true);
            }
        };

        window.addEventListener("storage", listener);

        return () => {
            window.removeEventListener("storage", listener);
        };
    }, [storageKey]);

    /**
     * Esta función es llamada cuando el usuario elige sincronizar el estado.
     */
    const f_toggleShow = () => {
        f_sincronize();
        setStorageChange(false);
    };

    return {
        show: storageChange,
        f_toggleShow,
    };
}

export { useStorageListener };
