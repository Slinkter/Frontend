import React, { useEffect, useState } from "react";
import Suggestions from "./suggesstion";

const SearchAutoComplete = () => {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  async function fetchListOfUsers() {
    try {
      setloading(true);
      const url = "https://dummyjson.com/users";
      //
      const res = await fetch(url);
      const data = await res.json();
      // -->
      if (data && data.users && data.users.length) {
        const onlyNames = data.users.map((user) => user.firstName);
        setUsers(onlyNames);
        setFilteredUsers(onlyNames);
        setloading(false);
        setError(null);
        setShowDropDown(true);
      }
    } catch (error) {
      setloading(false);
      setError(error);
    }
  }

  function handleChange(e) {
    const query = e.target.value.toLowerCase();
    setSearchParam(query);
    // -->
    if (query) {
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().includes(query)) //true : encuentra --> add filteredData , false : -1
          : [];
      setFilteredUsers(filteredData);
      setShowDropDown(true);
    } else {
      setFilteredUsers(users);
    }
  }

  function handleClick() {
    console.log("ok");
  }

  useEffect(() => {
    fetchListOfUsers();
  }, []);

  console.log("filteredUsers : ", filteredUsers);
  console.log("showDropDown : ", showDropDown);
  return (
    <div className="search-autocomplete-container">
      {loading ? (
        <h1>Loading data ! Please wait it !!</h1>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Search users here..."
            name="search-users"
            value={searchParam}
            onChange={(e) => handleChange(e)}
          />
        </div>
      )}
      {showDropDown && (
        <Suggestions handleClick={handleClick} data={filteredUsers} />
      )}
    </div>
  );
};

export default SearchAutoComplete;
