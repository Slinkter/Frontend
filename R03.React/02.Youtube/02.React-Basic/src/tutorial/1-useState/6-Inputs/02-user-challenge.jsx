import React, { useState } from "react";
import { data } from "../../../db/data";

const UserChallenge = () => {
    document.title = "02-user-challenge";
    const [name, setName] = useState("");
    const [users, setUsers] = useState(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        //-->
        if (!name) return;
        const fakeId = Date.now();
        const newUser = { id: fakeId, name: name };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        setName("");
    };
    const removeUser = (id) => {
        const updatedUsers = users.filter((person) => person.id !== id);
        setUsers(updatedUsers);
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <h4>Add user</h4>
                <div className="form-row">
                    <label htmlFor="name" className="form-label">
                        name :
                    </label>
                    <input
                        type="text "
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                    />
                </div>
                <button>submit</button>
            </form>
            {/* ----------- */}
            <h2>users</h2>
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <h4>{user.name}</h4>
                        <button
                            className="btn"
                            onClick={() => removeUser(user.id)}
                        >
                            remove
                        </button>
                    </div>
                );
            })}
        </>
    );
};

export default UserChallenge;
