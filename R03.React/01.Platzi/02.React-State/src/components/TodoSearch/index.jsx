import React from 'react';
import './TodoSearch.css';

/**
 * A functional component that renders a search input field for TODOs.
 * It's a controlled component, meaning its value is controlled by props.
 *
 * @param {object} props The component's properties.
 * @param {string} props.searchValue The current value of the search input.
 * @param {function(string): void} props.setSearchValue A function to update the search value.
 * @returns {React.ReactElement} The search input element.
 */
function TodoSearch({ searchValue, setSearchValue }) {
  const onSearchValueChange = (event) => {
    console.log(event.target.value);
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