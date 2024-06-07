import React, { useEffect, useState } from "react";
import { getConnections } from "../../../api/FirestoreAPI";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const ConnectedUsers = ({ user, currentUser, getCurrentUser }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getConnections(currentUser.id, user.userID, setIsConnected);
  }, [currentUser.id, user.userID]);

  return isConnected ? (
    <></>
  ) : (
    <>
      <div className="grid-child">
        <img src={user.imageLink} alt="user img link" />
        <p className="name">{user.name}</p>
        <p className="headline">{user.headline}</p>
        <button onClick={() => getCurrentUser(user.id)}>
          <AiOutlineUsergroupAdd size={20} />
          Connect
        </button>
      </div>
    </>
  );
};

export default ConnectedUsers;
