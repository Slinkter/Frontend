import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExists,
} from "../firebase/firebase";

export default function AuthProvider(props) {
  // de las 3 funciones , solo una se va a ejecutar
  const { children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered } =
    props;
  const navigate = useNavigate();
  //
  useEffect(() => {
    //---> Init Auth
    onAuthStateChanged(auth, async (user) => {
      console.group("onAuthStateChanged");
      if (user) {
        console.log("user existe");
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          console.log("isRegistered : ", isRegistered);
          const userInfo = await getUserInfo(user.uid);
          console.log("userInfo : ", userInfo);
          if (userInfo.processCompleted) {
            onUserLoggedIn(userInfo);
            console.log("--> onUserLoggedIn : ");
          } else {
            onUserNotRegistered(userInfo);
            console.log("--> onUserNotRegistered: ");
          }
        } else {
          // creacion por default al iniciar por primera vez
          const newUser = {
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: "",
            username: "",
            processCompleted: false,
          };
          await registerNewUser(newUser);
          onUserNotLoggedIn(user);
          console.log("--> onUserNotLoggedIn");
        }
      } else {
        console.log("user not existe");
        onUserNotLoggedIn();
        console.log("onUserNotLoggedIn");
      }

      console.groupEnd();
    });
    // --->Finish Auth
  }, [navigate, onUserLoggedIn, onUserNotRegistered, onUserNotLoggedIn]);

  return <div> {children}</div>;
}
