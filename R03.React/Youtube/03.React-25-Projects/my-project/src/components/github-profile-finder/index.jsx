import React, { useEffect, useState } from "react";
import User from "./user";
import "./styles.css";

const GithubProfileFinder = () => {
    /* hooks */
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("slinkter");
    const [userData, setUserData] = useState(null);

    async function fetchGithubUserData() {
        try {
            setLoading(true);
            const url = `https://api.github.com/users/${userName}`;
            //
            const res = await fetch(url);
            const data = await res.json();
            if (data) {
                setUserData(data);
                setLoading(false);
                setUserName("");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    function handleSubmit() {
        if (!userName || userName.trim() === "") {
            alert("nombre vacio o invalido");
            return;
        }

        fetchGithubUserData();
    }

    useEffect(() => {
        fetchGithubUserData();
    }, []);

    if (loading && !userData) {
        return <h1>Loading data ! please wait</h1>;
    }

    return (
        <div className="github-profile-container">
            <div className="input-wrapper">
                <input
                    type="text"
                    name="search-by-username"
                    placeholder="search github username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={handleSubmit}> Search </button>
            </div>
            {userData != null ? <User user={userData} /> : null}
        </div>
    );
};

export default GithubProfileFinder;
