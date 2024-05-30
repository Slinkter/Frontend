import { useMemo, useState } from "react";
import "./ProfileCard.scss";
import {
  getSingleStatus,
  getSingleUser,
  getStatus,
} from "../../../api/FirestoreAPI";
import PostCard from "../PostCard/PostCard";

import { useLocation } from "react-router-dom";

const ProfileCard = ({ onEdit, currentUser }) => {
  let location = useLocation();
  const [allStatuses, setAllStatuses] = useState([]);
  const [currentProfile, setCurrentProfile] = useState([]);

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatuses, location?.state?.id);
    }
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <>
      <div className="profile-card">
        <div className="edit-btn">
          <button onClick={onEdit}>Edit</button>
        </div>

        <div className="profile-info">
          <h3 className="username">{currentUser.name}</h3>
          <p className="userEmail"> {currentUser.email} </p>
          <p>{currentUser.location}</p>
        </div>

        <div className="right-info">
          <p className="college">{currentUser.college}</p>
          <p className="company">{currentUser.company}</p>
        </div>
      </div>
      <div className="post-status-main">
        {allStatuses
          .filter((item) => {
            return item.userEmail === localStorage.getItem("userEmail");
          })
          .map((post) => {
            return <div key={post.id}>{<PostCard post={post} />}</div>;
          })}
      </div>
    </>
  );
};

export default ProfileCard;
