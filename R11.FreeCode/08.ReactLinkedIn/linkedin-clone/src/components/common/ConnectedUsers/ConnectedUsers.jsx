import React from "react";

const ConnectedUsers = ({ user, getCurrentUser }) => {
  return (
    <div className="grid-child" onClick={() => getCurrentUser(user.id)}>
      <p>{user.name}</p>
      <p>{user.headline}</p>
    </div>
  );
};

export default ConnectedUsers;
