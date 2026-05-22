import { useState, useEffect } from "react";

/**
 * Custom hook to listen for changes in `localStorage` across different browser tabs or windows.
 */
function useStorageListener(synchronize) {
    // Estado local: Controla la visibilidad de la alerta de cambio
    const [hasStorageChanges, setHasStorageChanges] = useState(false);

    // Effect: Suscripción al evento 'storage' global de la ventana
    useEffect(() => {
        /**
         * Manejador de evento: Filtra cambios específicos para la llave de TODOs
         */
        const onChange = (change) => {
            if (change.key === "TODOS_V1") {
                setHasStorageChanges(true);
            }
        };

        window.addEventListener("storage", onChange);

        // Cleanup: Elimina el event listener al desmontar para evitar fugas de memoria
        return () => window.removeEventListener("storage", onChange);
    }, []);

    /**
     * Callback: Ejecuta la sincronización de datos y oculta la alerta
     */
    const onSync = () => {
        synchronize();
        setHasStorageChanges(false);
    };

    return {
        hasChanges: hasStorageChanges,
        onSync,
    };
}

export { useStorageListener };
