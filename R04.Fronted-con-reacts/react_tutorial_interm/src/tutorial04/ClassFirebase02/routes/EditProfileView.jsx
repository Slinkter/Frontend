import { async } from "@firebase/util";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import DashboardWrapper from "../components/dashboardWrapper";
import {
  getProfilePhotoUrl,
  setUserProfilePhoto,
  firebase_updateUser,
} from "../firebase/firebase";

import style from "./editProfileview.module.css";

export default function EditProfileView() {
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setState] = useState(0);
  const [profileUrl, setProfileUrl] = useState();

  const fileRef = useRef(null);
  const navigate = useNavigate();

  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  function handleChangeFile(e) {
    const files = e.target.files; //
    const fileReader = new FileReader();

    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;
        const res = await setUserProfilePhoto(currentUser.uid, imageData);
        // hasta aqui ya se subio la imagen a firebase-storage
        console.log(res);
        if (res) {
          const tmpUser = { ...currentUser };
          tmpUser.profilePicture = res.metadata.fullPath;
          console.log(tmpUser);
          await firebase_updateUser(tmpUser);
          setCurrentUser({ ...tmpUser });
          const url = await getProfilePhotoUrl(currentUser.profilePicture);
          setProfileUrl(url);
          console.log(url);
        }
      };
    }
  }

  async function handleUserLoggedIng(user) {
    setCurrentUser(user);
    setState(2);
    // update img
    const url = await getProfilePhotoUrl(user.profilePicture);
    setProfileUrl(url);
  }
  function handleUserNoRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  if (state !== 2) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIng}
        onUserNotRegistered={handleUserNoRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        Loading ...
      </AuthProvider>
    );
  } else {
    return (
      <DashboardWrapper>
        <div>
          <h2> Edit Profile Info</h2>
          <div className={style.profilePictureContainer}>
            <div>
              <img src={profileUrl} alt="" width={100} />
            </div>
            <div>
              <button className="btn" onClick={handleOpenFilePicker}>
                Choose new profile picture
              </button>
              <input
                className={style.fileInput}
                ref={fileRef}
                type="file"
                onChange={handleChangeFile}
              />
            </div>
          </div>
        </div>
      </DashboardWrapper>
    );
  }
}
