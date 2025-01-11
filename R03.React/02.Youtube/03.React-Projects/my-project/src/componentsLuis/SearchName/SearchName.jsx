import React, { useState, useEffect } from "react";
import "./index.css";

const URL_USERS = "https://dummyjson.com/users";

const SearchName = () => {
    const [inputText, setInputText] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(URL_USERS);
                const data = await res.json();
                setUsers(data.users);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleChangeText = (e) => {
        setInputText(e.target.value);
    };

    const filteredUsers = inputText
        ? users.filter((user) =>
              user.firstName.toLowerCase().includes(inputText.toLowerCase())
          )
        : users;

    return (
        <div className="container-search">
            <input
                type="text"
                onChange={handleChangeText}
                value={inputText}
                placeholder="Search by first name"
            />
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error loading users</p>
            ) : (
                <ol>
                    {filteredUsers.map((user) => (
                        <li key={user.id} className="list-search">
                            <p>{user.firstName}</p>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
};

export default SearchName;
