import { useMemo, useState } from "react";

import { getSingleStatus, getSingleUser } from "../../../api/FirestoreAPI";
import PostCard from "../PostCard/PostCard";
import { useLocation } from "react-router-dom";
import { FaBeer } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi";

import "./ProfileCard.scss";

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
          <HiOutlinePencil className="edit-icon" onClick={onEdit} />
        </div>

        <div className="profile-info">
          <div>
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser?.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {" "}
              {Object.values(currentProfile).length === 0
                ? currentUser?.headline
                : currentProfile?.headline}
            </p>
            <p>
              {Object.values(currentProfile).length === 0
                ? currentUser?.location + currentUser?.country
                : currentProfile?.location}
            </p>
            <a
              className="website"
              target="_blank"
              href={
                Object.values(currentProfile).length === 0
                  ? currentUser?.website
                  : currentProfile?.website
              }
            >
              {Object.values(currentProfile).length === 0
                ? currentUser?.website
                : currentProfile?.website}
            </a>
          </div>
        </div>

        <div className="right-info">
          <p className="college">
            {Object.values(currentProfile).length === 0
              ? currentUser?.college
              : currentProfile?.college}
          </p>
          <p className="company">
            {Object.values(currentProfile).length === 0
              ? currentUser?.college
              : currentProfile?.college}
          </p>
        </div>
      </div>
      <div className="post-status-main">
        {allStatuses
          .filter((item) => {
            return item.userEmail === localStorage.getItem("userEmail");
          })
          .map((post) => {
            return (
              <div key={post.id}>
                <PostCard post={post} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProfileCard;
