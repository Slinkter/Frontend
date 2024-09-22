import React, { useState, useEffect } from "react";

const MultipleReturns = () => {
    // HOOKS
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState(null);
    // FUNCTION AUX
    const getOneUser = async () => {
        try {
            const url = "https://api.github.com/users/QuincyLarson";
            const res = await fetch(url);
            const data = await res.json();
            if (!res.ok) {
                setIsError(true);
                setIsLoading(false);
                return;
            }
            console.log(res);
            console.log(data);
            setUser(data);
            setIsError(false);
        } catch (error) {
            setIsError(true);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    //
    useEffect(() => {
        setTimeout(() => {
            getOneUser();
        }, 3000);
    }, []);
    //
    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }
    //
    if (isError) {
        return (
            <div>
                <h1>Error....</h1>
            </div>
        );
    }

    const { avatar_url, name, company, bio } = user;
    return (
        <div>
            <img
                style={{ width: "150px", borderRadius: "25px" }}
                src={avatar_url}
                alt={name}
            />
            <h2>{name}</h2>
            <h4>works at {company}</h4>
            <p>{bio}</p>
        </div>
    );
};

export default MultipleReturns;
