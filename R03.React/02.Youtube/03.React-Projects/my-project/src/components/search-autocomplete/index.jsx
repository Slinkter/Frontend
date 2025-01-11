import React, { useEffect, useState } from "react";
import Suggestions from "./suggesstion";
import "./index.css";
/*  */
const url = "https://dummyjson.com/users";
/*  */
const SearchAutoComplete = () => {
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchParam, setSearchParam] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);

    async function fetchListOfUsers() {
        try {
            setloading(true);
            //
            const res = await fetch(url);
            const data = await res.json();
            // -->
            if (data && data.users && data.users.length) {
                const names = [...data.users.map((user) => user.firstName)];
                setFilteredUsers(names);
                setUsers(names);
                setShowDropDown(true);
            }
        } catch (error) {
            setloading(false);
            setError(error);
        } finally {
            setloading(false);
            setError(null);
        }
    }

    function handleChange(e) {
        const inputName = e.target.value.toLowerCase();
        setSearchParam(inputName);
        // -->
        if (!inputName) {
            setFilteredUsers(users); // show original list
        } else {
            const filteredData = users.filter((user) =>
                user.toLowerCase().includes(inputName)
            );
            setFilteredUsers(filteredData);
            setShowDropDown(true);
        }
    }

    function handleClick() {
        console.log("past function");
    }

    useEffect(() => {
        fetchListOfUsers();
    }, []);

    return (
        <div className="search-autocomplete-container">
            {loading && !users && !error ? (
                <h1>Loading data ! Please wait it !!</h1>
            ) : (
                <div>
                    <input
                        className=""
                        type="text"
                        placeholder="Search users here..."
                        name="search-users"
                        value={searchParam}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            )}
            {showDropDown && (
                <Suggestions data={filteredUsers} handleClick={handleClick} />
            )}
        </div>
    );
};

export default SearchAutoComplete;
