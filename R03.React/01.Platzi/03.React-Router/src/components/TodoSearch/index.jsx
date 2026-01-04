import React from "react";
import "../../styles/TodoSearch.css";

/**
 * Componente de barra de búsqueda.
 * Permite filtrar los TODOs visibles mediante un input controlado.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.searchValue - Valor actual del buscador.
 * @param {Function} props.setSearchValue - Función para actualizar el valor del buscador.
 * @param {boolean} props.loading - Indica si la aplicación está cargando para deshabilitar el input.
 * @returns {JSX.Element} Input de búsqueda.
 */
function TodoSearch({ searchValue, setSearchValue, loading }) {
    const onSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <input
            className="TodoSearch"
            placeholder="Cebolla"
            value={searchValue}
            onChange={onSearchValueChange}
            disabled={loading}
        />
    );
}

export { TodoSearch };
