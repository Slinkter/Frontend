import React, { useEffect, useState } from "react";

import { addConnection, getAllUsers } from "../api/FirestoreAPI";
import ConnectedUsers from "./common/ConnectedUsers/ConnectedUsers";
import "../Sass/ConnectionsComponent.scss";
const ConnectionsComponent = ({ currentUser }) => {
  const [users, setUsers] = useState([]);

  const getCurrentUser = (id) => {
    console.log(id);
    addConnection(currentUser?.id, id);
  };

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <div className="connections-main">
      {users.map((user) => {
        return user.id === currentUser.id ? (
          <></>
        ) : (
          <>
            <ConnectedUsers
              user={user}
              currentUser={currentUser}
              getCurrentUser={getCurrentUser}
            />
          </>
        );
      })}
    </div>
  );
};

export default ConnectionsComponent;
