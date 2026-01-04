import React from "react";
import "../../styles/TodoList.css";

/**
 * Contenedor de lista inteligente (Smart Component).
 * Maneja lógica de renderizado condicional para estados de: Error, Loading, Vacío y Resultados de Búsqueda.
 * Soporta Render Props o Children Function para máxima flexibilidad.
 * 
 * @param {Object} props - Propiedades de control y renderizado.
 * @returns {JSX.Element} Sección contenedora de la lista.
 */
function TodoList({
    error,
    loading,
    totalTodos,
    searchedTodos,
    searchText,
    onError,
    onLoading,
    onEmptyTodos,
    onEmptySearchResults,
    children,
    render,
}) {
    const renderFunc = children || render;

    return (
        <section className="TodoList-container">
            {error && onError()}
            {loading && onLoading()}
            {!loading && !totalTodos && onEmptyTodos()}
            {totalTodos &&
                !searchedTodos.length &&
                onEmptySearchResults(searchText)}
            {!loading && !error && searchedTodos.map(renderFunc)}
        </section>
    );
}

export { TodoList };
