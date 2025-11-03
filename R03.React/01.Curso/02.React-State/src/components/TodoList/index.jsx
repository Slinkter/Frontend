import React from 'react';
import './TodoList.css';

function TodoList(props) {
  return (
    <section className="TodoList-container">
      {props.children}
    </section>
  );
}

export { TodoList };