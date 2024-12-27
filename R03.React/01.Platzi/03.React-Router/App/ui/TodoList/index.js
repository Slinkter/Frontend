import React from "react";
import "./TodoList.css";

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
