import React from "react";
import "../../styles/TodosLoading.css";

/**
 * Componente de estado de carga (Skeleton Loader).
 * Muestra una animación visual mientras se obtienen los TODOs del almacenamiento.
 * 
 * @returns {JSX.Element} Elemento visual de carga.
 */
function TodosLoading() {
    return (
        <div className="LoadingTodo-container">
            <span className="LoadingTodo-completeIcon"></span>
            <p className="LoadingTodo-text">Cargando TODOs...</p>
            <span className="LoadingTodo-deleteIcon"></span>
        </div>
    );
}

export { TodosLoading };
