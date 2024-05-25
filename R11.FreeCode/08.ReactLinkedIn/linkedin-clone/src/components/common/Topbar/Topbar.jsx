import React from "react";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import "./Topbar.scss";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";

import user from "../../../assets/user.png";

const Topbar = () => {
  return (
    <div className="topbar-main">
      <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
      <div className="react-icons">
        <AiOutlineSearch size={40} className="react-icon" />
        <AiOutlineHome size={40} className="react-icon" />
        <AiOutlineUserSwitch size={40} className="react-icon" />
        <BsBriefcase size={40} className="react-icon" />
        <AiOutlineMessage size={40} className="react-icon" />
        <AiOutlineBell size={40} className="react-icon" />
      </div>
      <img className="user-logo" src={user} alt="user" />
    </div>
  );
};

export default Topbar;
