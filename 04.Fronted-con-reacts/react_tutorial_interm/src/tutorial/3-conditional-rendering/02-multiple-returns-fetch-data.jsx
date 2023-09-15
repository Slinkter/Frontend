import React, { useState, useEffect } from "react";

const url = "https://api.github.com/users/QuincyLarson";
const initialDefault = null;
const initialLoading = true;
const initError = false;

const MultipleReturns = () => {
  // HOOKS
  const [user, setUser] = useState(initialDefault);
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [isError, setIsError] = useState(initError);
  // FUNCTION AUX
  const getOneUser = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.log(res);
        setIsError(true);
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      console.log(res);
      console.log(data);
      setUser(data);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsError(true);
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

/*
useEffect(() => {
        fetch(url)
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299) {
                    return resp.json();
                } else {
                    setIsLoading(false);
                    setIsError(true);
                    throw new Error(resp.statusText);
                }
            })
            .then((user) => {
                const { login } = user;
                setUser(login);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, []); 
*/
