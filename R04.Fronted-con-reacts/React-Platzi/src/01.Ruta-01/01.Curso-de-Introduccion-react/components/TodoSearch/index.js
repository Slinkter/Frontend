import React from "react";
import { TodoContext } from "../TodoContext";
import "./TodoSearch.css";

function TodoSearch() {
  // Hook
  const { stateSearch, setStateSearch } = React.useContext(TodoContext);
  // Funcion
  const onSearchValueChange = (e) => {
    setStateSearch(e.target.value);
  };

  return (
    <input
      className="TodoSearch"
      placeholder="ingresar un valor"
      value={stateSearch}
      onChange={onSearchValueChange}
    />
  );
}

export { TodoSearch };
