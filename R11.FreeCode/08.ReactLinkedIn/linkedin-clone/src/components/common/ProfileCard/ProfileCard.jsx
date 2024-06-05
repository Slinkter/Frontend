import { useEffect, useMemo, useState } from "react";
import {
  editProfile,
  getSingleStatus,
  getSingleUser,
} from "../../../api/FirestoreAPI";
import PostCard from "../PostCard/PostCard";
import { useLocation } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
//
import "./ProfileCard.scss";
import { ImageUpload as uploadImageAPI } from "../../../api/ImageUpload";

const ProfileCard = ({ onEdit, currentUser }) => {
  let location = useLocation();
  const [allStatuses, setAllStatuses] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});

  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };

  const uploadImage = () => {
    uploadImageAPI(currentImage, currentUser?.id);
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatuses, location?.state?.id);
    }
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  console.log("currentUser", currentUser);
  return (
    <>
      <div className="profile-card">
        <input type="file" onChange={getImage} />
        <button onClick={uploadImage}>upload</button>
        <div className="edit-btn">
          <HiOutlinePencil className="edit-icon" onClick={onEdit} />
        </div>

        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              src={currentUser?.imageLink}
              alt="imagelink"
            />
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
            <p className="location">
              {Object.values(currentProfile).length === 0
                ? currentUser?.city + " " + currentUser?.country
                : currentProfile?.city + " " + currentProfile?.location}
            </p>
            <a
              className="website"
              target="_blank"
              href={
                Object.values(currentProfile).length === 0
                  ? `${currentUser?.website}`
                  : currentProfile?.website
              }
            >
              {Object.values(currentProfile).length === 0
                ? `${currentUser?.website}`
                : currentProfile?.website}
            </a>
          </div>
        </div>

        <div className="right-info">
          <p className="college">
            {Object.values(currentProfile).length === 0
              ? currentUser?.college
              : currentProfile?.college}
            (college)
          </p>
          <p className="company">
            {Object.values(currentProfile).length === 0
              ? currentUser?.company
              : currentProfile?.company}
          </p>
        </div>
        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? `${currentUser?.abuteMe}`
            : currentProfile?.abuteMe}
        </p>
        <p className="skill">
          <span className="skill-label">Skills</span> :&nbsp;
          {Object.values(currentProfile).length === 0
            ? `${currentUser?.skills}`
            : currentProfile?.skills}
        </p>
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
