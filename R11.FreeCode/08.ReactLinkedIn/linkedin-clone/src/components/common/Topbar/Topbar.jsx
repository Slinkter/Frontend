import React, { useEffect, useState } from "react";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import "./Topbar.scss";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import user from "../../../assets/user.png";
import { useNavigate } from "react-router-dom";
import ProfilePopup from "../ProfilePopup/ProfilePopup";

const Topbar = ({ currentUser }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  let navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const opneUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debouned = setTimeout(() => {
      handleSearch();
    });
    return () => clearTimeout(debouned);
  }, [searchInput]);
  useEffect(() => {
    /*  */
  }, []);

  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
      <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
      <div className="react-icons">
        <AiOutlineSearch
          size={30}
          className="react-icon"
          onClick={() => setIsSearch(true)}
        />
        <AiOutlineHome
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/home")}
        />
        <AiOutlineUserSwitch
          size={30}
          className="react-icon"
          onClick={() => goToRoute("/connections")}
        />
        <BsBriefcase size={30} className="react-icon" />
        <AiOutlineMessage size={30} className="react-icon" />
        <AiOutlineBell size={30} className="react-icon" />
      </div>
      <img
        className="user-logo"
        src={currentUser?.imageLink}
        alt="user"
        onClick={displayPopup}
      />
    </div>
  );
};

export default Topbar;
