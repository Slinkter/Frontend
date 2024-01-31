import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  auth,
  firebase_getUserInfo,
  firebase_registerNewUser,
  firebase_userExists,
} from "../firebase/firebase";

export default function AuthProvider(props) {
  // de las 3 funciones , solo una se va a ejecutar
  const { onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered } = props;
  const { children } = props;
  //
  const navigate = useNavigate();
  //
  useEffect(() => {
    // <--- Init Auth --->
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        onUserNotLoggedIn();
      } else {
        //  firebase.js
        const isRegistered = await firebase_userExists(user.uid);
        //
        if (!isRegistered) {
          // creacion por default al iniciar por primera vez
          const newUser = {};
          //
          newUser.uid = user.uid;
          newUser.displayName = user.displayName;
          newUser.profilePicture = "";
          newUser.username = "";
          newUser.processCompleted = false;
          //  firebase.js
          await firebase_registerNewUser(newUser);
          //
          onUserNotLoggedIn(user);
        } else {
          //  firebase.js
          const userInfo = await firebase_getUserInfo(user.uid);
          //
          if (userInfo.processCompleted) {
            onUserLoggedIn(userInfo);
          } else {
            onUserNotRegistered(userInfo);
          }
        }
      }
    });
    // <--- End Auth --->
  }, [navigate, onUserLoggedIn, onUserNotRegistered, onUserNotLoggedIn]);

  return <div className=""> {children}</div>;
}
