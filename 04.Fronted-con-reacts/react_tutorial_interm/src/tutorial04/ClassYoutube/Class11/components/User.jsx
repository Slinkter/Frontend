import React from "react";
import HigherOrder from "../HigherOrder";

const User = ({ data }) => {
    return (
        <ul>
            {data.slice(0, 5).map((user) => {
                return <li key={user.id}>{user.name}</li>;
            })}
        </ul>
    );
};

const UsersComp = HigherOrder("Users", User, "users");

export default UsersComp;
