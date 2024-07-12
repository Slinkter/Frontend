import React from "react";

const User = ({ user }) => {
  const {
    avatar_url,
    followers,
    following,
    public_repos,
    name,
    login,
    created_at,
  } = user;
  const createdDateAt = new Date(created_at);
  console.log(created_at);
  console.log(createdDateAt);

  return (
    <div className="user">
      <div>
        <img src={avatar_url} alt="user" className="avatar" />
      </div>
      <a href={`https://github.com/${login}`}> {name || login}</a>
      <div className="name-container">
        <div></div>
        <p>
          User joined on
          {` 
          ${createdDateAt.getDate()} 
          ${createdDateAt.toLocaleDateString("en-us", { month: "short" })} 
          ${createdDateAt.getFullYear()}
          `}
        </p>
      </div>
      <div className="profile-info">
        <div>
          <p>Public Repos</p>
          <p>{public_repos}</p>
        </div>
        <div>
          <p>Followers</p>
          <p>{followers}</p>
        </div>
        <div>
          <p> Following </p>
          <p>{following} </p>
        </div>
      </div>
    </div>
  );
};

export default User;
