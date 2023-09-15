import React from "react";
import useFetch from "./useFetch01";

const url = "https://api.github.com/users/QuincyLarson";
const FetchData = () => {
  const { isLoading, isError, data: user } = useFetch(url);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>there was an error ...</h2>;
  }

  const { name, company, bio, avatar_url } = user;

  return (
    <>
      <img
        src={avatar_url}
        alt=""
        style={{ width: "150px", borderRadius: "25px" }}
      />
      <h2>{name}</h2>
      <h4>works at {company}</h4>
      <p>{bio}</p>
    </>
  );
};

export default FetchData;
