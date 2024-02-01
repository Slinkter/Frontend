import React from "react";
import { TodoCounter } from "../components/TodoCounter";
import { TodoContext } from "../components/TodoContext";
import { TodoSearch } from "../components/TodoSearch";
import { TodoList } from "../components/TodoList";
import { TodoItem } from "../components/TodoItem";
import { CreateTodoButton } from "../components/CreateTodoButton";
import { Modal } from "../components/Modal";
import { TodoForm } from "../components/TodoForm";

function AppUI() {
  // -->
  const {
    error,
    loading,
    searchedTodos: listTodos,
    onUpdateItem,
    onDeleteItem,
    openModel,
    setOpenModal,
  } = React.useContext(TodoContext);

  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      <TodoList>
        {error && <p> Hubo un error</p>}
        {loading && <p> Estamos cargando</p>}
        {!loading && !listTodos.lenght && <p>Crear tu primer TODO</p>}
        {listTodos.map((item) => (
          <TodoItem
            key={item.text}
            text={item.text}
            completed={item.completed}
            onUpdateItem={() => onUpdateItem(item.text)}
            onDeleteItem={() => onDeleteItem(item.text)}
          />
        ))}
      </TodoList>
      {!!openModel && (
        <Modal>
          <TodoForm />
        </Modal>
      )}

      <CreateTodoButton setOpenModal={setOpenModal} />
    </React.Fragment>
  );
}

export { AppUI };
