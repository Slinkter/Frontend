//  Search text input array
import React, { useEffect, useState } from "react";
import "./Class13.css";

const initValues = {
    users: [],
    inputText: "",
    searchItems: [],
};
const url = "https://jsonplaceholder.typicode.com/users";

const Class13 = () => {
    // Hooks
    const [users, setUsers] = useState(initValues.users);
    const [inputText, setInputText] = useState(initValues.inputText);
    const [searchedItems, setSearchedItems] = useState(initValues.searchItems);
    //
    const getData = async () => {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setUsers(data);
    };
    //
    const userFilter = () => {
        return users.filter((user) => {
            return Object.values(user)
                .join()
                .toLowerCase()
                .includes(inputText.toLowerCase());
        });
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (inputText) {
            setTimeout(() => {
                const usersFilter = userFilter();
                setSearchedItems(usersFilter);
            }, 500);
        } else {
            setSearchedItems(users);
        }
    }, [inputText]);

    return (
        <div>
            <input
                type="text"
                className="search"
                onChange={(e) => setInputText(e.target.value)}
            />
            <div className="grid-main">
                {inputText.length > 0
                    ? searchedItems.map((user) => (
                          <ComponentRenderUser usuario={user} />
                      ))
                    : users.map((user) => (
                          <ComponentRenderUser usuario={user} />
                      ))}
            </div>
        </div>
    );
};

const ComponentRenderUser = ({ usuario }) => {
    return (
        <div key={usuario.id} className="grid-child">
            <h3>{usuario.name}</h3>
            <p>{usuario.email}</p>
        </div>
    );
};

export default Class13;
