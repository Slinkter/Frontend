import React, { useMemo, useState } from "react";
import Home from "../Pages/Home";
import Topbar from "../components/common/Topbar/Topbar";
import { getCurrentUser } from "../api/FirestoreAPI";

const HomeLayout = () => {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  console.log("currentState : ", currentUser);
  return (
    <div>
      <Topbar />
      <Home currentUser={currentUser} />
    </div>
  );
};

export default HomeLayout;
