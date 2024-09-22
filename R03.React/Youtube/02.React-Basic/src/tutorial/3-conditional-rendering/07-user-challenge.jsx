import React, { useState } from "react";

const UserChallenge = () => {
    // hook
    const [user, setUser] = useState(null);
    // func
    const login = () => {
        setUser({ name: "luis" });
    };
    // func
    const logout = () => {
        setUser(null);
    };

    return (
        <div>
            {user ? (
                <div>
                    <h4>hello there {user.name}</h4>
                    <button className="btn" onClick={logout}>
                        logout
                    </button>
                </div>
            ) : (
                <div>
                    <h4>Please login</h4>
                    <button className="btn" onClick={login}>
                        login
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserChallenge;
