import React from "react";

/**
 * Custom Hook que escucha cambios en el LocalStorage desde otras pestañas/ventanas.
 * Útil para mantener la aplicación sincronizada si el usuario modifica datos en otra instancia.
 * 
 * @param {Function} sincronize - Función para refrescar/resincronizar los datos locales.
 * @returns {Object} { show: boolean, toggleShow: Function } - Estado de alerta y función para ocultarla.
 */
function useStorageListener(sincronize) {
    const [storageChange, setStorageChange] = React.useState(false);

    window.addEventListener("storage", (change) => {
        if (change.key === "TODOS_V1") {
            console.log("Hubo cambios en TODOS_V1");
            setStorageChange(true);
        }
    });

    const toggleShow = () => {
        setStorageChange(false);
        sincronize();
    };

    return {
        show: storageChange,
        toggleShow,
    };
}

export { useStorageListener };
