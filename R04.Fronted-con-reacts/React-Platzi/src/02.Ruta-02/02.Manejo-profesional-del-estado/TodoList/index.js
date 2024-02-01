import React from "react";
import "./TodoList.css";

function TodoList(props) {
  const renderFunc = props.children || props.render;

  return (
    <section className="TodoList-container">
      {props.error && props.onError()}
      {props.loading && props.onLoading()}
      {/* loading : false ---> !false = true */}
      {/* totalTodos : 0  ---> !false  = true */}
      {!props.loading && !props.totalTodos && props.onEmptyTodos()}

      {!!props.totalTodos &&
        !props.searchedTodos.length &&
        props.onEmptySearchResults(props.searchText)}

      {!props.loading && !props.error && props.searchedTodos.map(renderFunc)}
    </section>
  );
}

export { TodoList };
