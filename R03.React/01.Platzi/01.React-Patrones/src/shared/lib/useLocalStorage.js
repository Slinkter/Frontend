/**
 * @file Este hook personalizado proporciona una interfaz robusta para interactuar con el `localStorage` del navegador.
 */

import React from "react";
import { STORAGE_SIMULATED_DELAY } from "@/shared/lib/constants";

/**
 * Un hook personalizado para gestionar la persistencia de datos en `localStorage`.
 *
 * @param {string} dbName El nombre de la clave a utilizar en `localStorage`.
 * @param {*} initialValue El valor inicial a utilizar si no se encuentran datos para el `dbName` dado.
 * @returns {object} Un objeto que contiene el estado persistido y las funciones de gestión.
 */
function useLocalStorage(dbName, initialValue) {
    // Estados para gestionar la carga, errores, el valor persistido y la sincronización.
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [item, setItem] = React.useState(initialValue);
    const [sincronizedItem, setSincronizedItem] = React.useState(true);
    // Efecto para cargar el valor desde `localStorage` con una simulación de retraso.
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            try {
                const localStorageItem = localStorage.getItem(dbName);
                let parsedItem;

                if (!localStorageItem) {
                    localStorage.setItem(dbName, JSON.stringify(initialValue));
                    parsedItem = initialValue;
                } else {
                    parsedItem = JSON.parse(localStorageItem);
                }

                setItem(parsedItem);
                setSincronizedItem(true);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }, STORAGE_SIMULATED_DELAY);

        return () => clearTimeout(timeoutId);
    }, [sincronizedItem, dbName, initialValue]);

    const saveItem = (newItem) => {
        try {
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(dbName, stringifiedItem);
            setItem(newItem);
        } catch (error) {
            setError(error);
        }
    };

    const sincronizeItem = () => {
        setLoading(true);
        setSincronizedItem(false);
    };

    return {
        item,
        saveItem,
        loading,
        error,
        sincronizeItem,
    };
}

export { useLocalStorage };
