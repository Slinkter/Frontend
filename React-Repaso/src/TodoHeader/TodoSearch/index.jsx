import "./index.css";

const TodoSearch = ({ searchValue, setSearchValue, loading }) => {
  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <input
      className="TodoSearch"
      placeholder="ingresar text"
      value={searchValue}
      onChange={onSearchValueChange}
      disabled={loading}
    />
  );
};

export default TodoSearch;
