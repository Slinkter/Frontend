import React from "react";

import "./ProfilePopup.scss";
import { onLogout } from "../../../api/AuthAPI";

const ProfilePopup = () => {
  return (
    <div className="popup-card">
      <ul className="popup-options">
        <li className="popup-option" onClick={onLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default ProfilePopup;
