import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublickLink from "../components/publicLink";
import {
  existsUsername,
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
} from "../firebase/firebase";

import style from "./publicProfileView.module.css";
import styleLinks from "../components/publickLink.module.css";

export default function PublicProfileView() {
  //
  const params = useParams();
  //
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");
  const [state, setState] = useState(0);

  useEffect(() => {
    getProfile();
    async function getProfile() {
      const username = params.username; //   path/:username
      console.log("username : ", username);
      try {
        const userUid = await existsUsername(username); 
        console.log("userUid : ", userUid);
        // validar
        if (userUid) {
          const userInfo = await getUserPublicProfileInfo(userUid);

          setProfile(userInfo);
          // obtener img del usuario
          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          setUrl(url);
        } else {
          setState(7);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [params]);

  if (state === 7) {
    return (
      <div>
        <h1> username doesnt existe</h1>
      </div>
    );
  }

  return (
    <div className={style.profileContainer}>
      <div className={style.profilePicture}>
        <img src={url} alt="" />
      </div>

      <h2> {profile?.profileInfo.username} </h2>
      <h3> {profile?.profileInfo.displayName} </h3>

      <div className={styleLinks.publicLinksContainer}>
        {profile?.linksInfo.map((link) => (
          <PublickLink key={link.id} url={link.url} title={link.title} />
        ))}
      </div>
    </div>
  );
}
