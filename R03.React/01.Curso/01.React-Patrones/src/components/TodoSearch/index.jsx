import React from 'react';
import { TodoContext } from '../TodoContext/index.jsx';
import './TodoSearch.css';

/**
 * @file TodoSearch.jsx
 * @description Search input for filtering TODOs.
 * @returns {JSX.Element} - The TodoSearch component.
 */

function TodoSearch() {
  const { searchValue, setSearchValue } = React.useContext(TodoContext);
  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <input
      className="TodoSearch"
      placeholder="Cebolla"
      value={searchValue}
      onChange={onSearchValueChange}
    />
  );
}

export { TodoSearch };


