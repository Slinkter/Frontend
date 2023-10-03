import React, { useEffect, useState } from "react";
import "./GitHubUser.css";
import ButtonModal from "./ButtonModal";

function GitHubUser(props) {
    const { user } = props;
    const [arrayuser, setArrayUser] = useState(user);

    // useEffect
    useEffect(() => {}, []);
    //
    return (
        <div>
            <h3> Users github</h3>
            <ul className="users">
                {arrayuser.map((user) => {
                    const { id, login, avatar_url } = user;
                    return (
                        <li key={id} className="card">
                            <img src={avatar_url} alt={login} />
                            <div>
                                <h4>{login}</h4>
                                <ButtonModal user={user} />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default GitHubUser;
