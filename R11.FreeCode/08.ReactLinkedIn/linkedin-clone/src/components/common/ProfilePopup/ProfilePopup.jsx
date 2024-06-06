import React, { useMemo, useState } from "react";

import { onLogout } from "../../../api/AuthAPI";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

import "./ProfilePopup.scss";

const ProfilePopup = () => {
  let navigate = useNavigate();
  const [currentUser, setcurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setcurrentUser);
  }, []);

  return (
    <div className="popup-card">
      <p>{currentUser?.name}</p>
      <Button
        title={"View Profile"}
        onClick={() =>
          navigate("/profile", { state: { id: currentUser?.userID } })
        }
      />
      <Button title={"  Logout"} onClick={onLogout} />
    </div>
  );
};

export default ProfilePopup;
