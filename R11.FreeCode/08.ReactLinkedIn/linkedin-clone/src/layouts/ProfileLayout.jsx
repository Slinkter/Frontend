import React, { useMemo, useState } from "react";
import Topbar from "../components/common/Topbar/Topbar";
import { getCurrentUser } from "../api/FirestoreAPI";
import Profile from "../Pages/Profile";

const ProfileLayout = () => {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  console.log("currentState : ", currentUser);

  return (
    <div>
      <Topbar />
      <Profile currentUser={currentUser} />
    </div>
  );
};

export default ProfileLayout;
