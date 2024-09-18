import { useCallback, useEffect, useMemo, useState } from "react";
import User from "./user";
import "./styles.css";

const GithubProfileFinder = () => {
    /* hooks */
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [userName, setUserName] = useState("slinkter");
    const [searchText, setSearchText] = useState("");
    const [userData, setUserData] = useState(null);

    const fetchGithubUserData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `https://api.github.com/users/${userName}`;
            const res = await fetch(url);
            const data = await res.json();
            //
            console.log(res);
            console.log(data);
            if (res.status === 403) {
                throw new Error("API rate limit exceeded");
            }
            if (res.status !== 200) {
                throw new Error(data.message || "Something went wrong");
            }
            setUserData(data);
        } catch (error) {
            console.log(error);
            setError(error.message);
            setUserData(null);
        } finally {
            setLoading(false);
        }
    }, [userName]);

    const handleSubmit = useCallback(() => {
        if (!searchText || searchText.trim() === "") {
            alert("Nombre vacío o inválido");
            return;
        }
        setUserName(searchText);
    }, [searchText]);

    useEffect(() => {
        fetchGithubUserData();
    }, [userName, fetchGithubUserData]);

    const userNotFound = useMemo(
        () => !userData && !loading && !error,
        [userData, loading, error]
    );

    return (
        <div className="github-profile-container">
            <div className="input-wrapper">
                <input
                    type="text"
                    name="search-by-username"
                    placeholder="Search  username"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button onClick={handleSubmit}> Search </button>
            </div>

            {loading && <h1>Loading data! Please wait...</h1>}

            {error && (
                <div className="error-message">
                    <h1>Error: {error}</h1>
                    {error === "API rate limit exceeded" && (
                        <div className="rate-limit-warning">
                            <p>
                                Has excedido el límite de llamadas a la API.
                                Intenta de nuevo más tarde o autentica tus
                                solicitudes para obtener un límite mayor.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {userNotFound && <span>No se encontró el usuario</span>}

            {userData && <User user={userData} />}
        </div>
    );
};

export default GithubProfileFinder;
