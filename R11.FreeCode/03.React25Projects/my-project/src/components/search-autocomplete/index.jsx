import React, { useEffect, useState } from "react";
import Suggestions from "./suggesstion";

const SearchAutoComplete = () => {
  const [loading, setloading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const [searchParam, setSearchParam] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(event) {
    const q = event.target.value.toLowerCase();
    setSearchParam(q);
    if (q.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(q) > -1)
          : [];
      setFilteredUsers(filteredData);
      setShowDropDown(true);
    } else {
      setShowDropDown(false);
    }
  }

  async function fetchListOfUsers() {
    try {
      setloading(true);
      const url = "https://dummyjson.com/users";
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.users && data.users.length) {
        setUsers(data.users.map((u) => u.firstName));
        setloading(false);
        setError(null);
      }
    } catch (error) {
      setloading(false);
      setError(error);
    }
  }

  useEffect(() => {
    fetchListOfUsers();
  }, []);

  function handleClick(e) {
    setShowDropDown(false);
    setSearchParam(e.target.innerText);
    setFilteredUsers([]);
  }

  console.log("users : ", users);
  console.log("filteredUsers : ", filteredUsers);
  return (
    <div className="search-autocomplete-container">
      {loading ? (
        <h1>Loading data ! Please wait it !!</h1>
      ) : (
        <input
          type="text"
          placeholder="Search users here..."
          name="search-users"
          value={searchParam}
          onChange={(e) => handleChange(e)}
        />
      )}

      {showDropDown && (
        <Suggestions handleClick={handleClick} data={filteredUsers} />
      )}
    </div>
  );
};

export default SearchAutoComplete;
