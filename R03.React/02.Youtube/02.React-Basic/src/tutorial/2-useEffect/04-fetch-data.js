import React, { useState, useEffect } from "react";

const UseEffectFetchData = () => {
    //   hook
    const [users, setUsers] = useState([]);
    //  getData from API Githun
    const getUsers = async () => {
        try {
            const url = "https://api.github.com/users";
            const res = await fetch(url);
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };
    //
    useEffect(() => {
        getUsers();
    }, []);

    //  Render components
    return (
        <>
            <h3>github users</h3>
            <ul className="users">
                {users.map(({ id, avatar_url, login, html_url }) => (
                    <li key={id}>
                        <img src={avatar_url} alt={login} />
                        <div>
                            <h4>{login}</h4>
                            <a href={html_url}>profile</a>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default UseEffectFetchData;
