import React from "react";
import "./index.css";

const TodoList = (props) => {
  const {
    children,
    render,
    error,
    OnError,
    loading,
    onLoading,
    totalTodos,
    onEmptyTodos,
    searchedTodos,
    onEmptySearchResults,
    searchText,
  } = props;

  const renderFunc = children || render;
  /*  */
  const showError = error && onerror();
  const showLoading = loading && onLoading();
  const showEmptyTodos = !loading && totalTodos && onEmptyTodos();
  const showEmptySearch =
    !!totalTodos && !searchedTodos.length && onEmptySearchResults(searchText);
  const showData = !loading && !error && searchedTodos.map(renderFunc);

  return (
    <section className="TodoList-container">
      {showError}
      {showLoading}
      {showEmptyTodos}
      {showEmptySearch}
      {showData}
    </section>
  );
};

export default TodoList;
