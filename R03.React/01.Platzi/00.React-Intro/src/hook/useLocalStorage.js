import React from "react";

/**
 * Hook personalizado para gestionar el estado en localStorage con manejo de carga y errores.
 * @param {string} storageKey - El nombre de la clave en localStorage.
 * @param {any} initialData - El valor inicial si no existen datos en localStorage.
 * @returns {object} Un objeto que contiene el estado de carga, el estado de error, los datos almacenados y una función de actualización.
 * @remarks
 * - Incluye un retraso simulado de 1s para demostrar los estados de carga.
 * - Sincroniza el estado con localStorage en cada cambio.
 */
const useLocalStorage = (storageKey, initialData = []) => {
    // Estados para manejar la carga, errores y los datos almacenados
    const [hasError, setHasError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [storedData, setStoredData] = React.useState(initialData);

    /**
     * Persiste un nuevo valor en localStorage y actualiza el estado del componente.
     * @param {any} newData - El nuevo valor a almacenar.
     * @remarks Utiliza useCallback para mantener la identidad referencial entre renderizados.
     */
    const saveData = React.useCallback(
        (list) => {
            try {
                localStorage.setItem(storageKey, JSON.stringify(list));
                setStoredData(list);
            } catch (err) {
                setHasError(true);
                console.error(`Error al guardar en "${storageKey}":`, err);
            }
        },
        [storageKey],
    );

    React.useEffect(() => {
        /**
         * Recupera los datos de localStorage e inicializa si faltan.
         */
        const fetchLocalStorageData = () => {
            try {
                setIsLoading(true);
                const localStorageData = localStorage.getItem(storageKey);

                if (!localStorageData) {
                    saveData(initialData);
                } else {
                    setStoredData(JSON.parse(localStorageData));
                }

                setHasError(false);
            } catch (err) {
                setHasError(true);
                console.error(
                    `Error al cargar la clave de localStorage "${storageKey}":`,
                    err,
                );
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchLocalStorageData();
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [storageKey, initialData, saveData]);

    return {
        isLoading,
        hasError,
        storedData,
        saveData,
    };
};

export { useLocalStorage };
