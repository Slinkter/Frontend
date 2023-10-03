import React from "react";
import "./TodoList.css";

function TodoList(props) {
  const renderFunc = props.children || props.render; // children = render (props)
  const ShowError = props.error && props.onError();
  const showLoading = props.loading && props.onLoading();
  const showEmptyTodos =
    !props.loading && !props.totalTodos && props.onEmptyTodos();
  const showEmptySearch =
    !!props.totalTodos &&
    !props.searchedTodos.length &&
    props.onEmptySearchResults(props.searchText);
  const showData =
    !props.loading && !props.error && props.searchedTodos.map(renderFunc);

  return (
    <section className="TodoList-container">
      {ShowError}
      {showLoading}
      {showEmptyTodos}
      {showEmptySearch}
      {showData}
    </section>
  );
}

export { TodoList };
