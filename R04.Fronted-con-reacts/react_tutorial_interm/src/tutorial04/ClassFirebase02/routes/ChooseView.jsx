import AuthProvider from "../components/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  firebase_existsUsername,
  firebase_updateUser,
} from "../firebase/firebase";

import style from "./chooseView.module.css";

export default function ChooseView() {
  // hooks
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");
  //
  const navigate = useNavigate();
  // change view
  if (state === 3) {
    function handleInputUsername(e) {
      setUsername(e.target.value);
    }

    async function handleBtnContinue() {
      if (username !== "") {
        const exists = await firebase_existsUsername(username); // return booleano
        //
        console.log(username);
        console.log(exists);
        //
        if (exists) {
          setState(5);
        } else {
          const tmp = { ...currentUser };
          tmp.username = username;
          tmp.processCompleted = true;
          await firebase_updateUser(tmp);
          setState(6);
        }
      }
    }

    if (state === 3 || state === 5) {
      return (
        <div className={style.chooseUsernameContainer}>
          <h1> Bienvenido {currentUser.displayName} </h1>
          <p> para terminar el proceso elige un nombre de usuario </p>
          {state === 5 ? <p> nombre invalido </p> : ""}
          <div>
            <input
              type="text"
              className="input"
              onChange={handleInputUsername}
            />
          </div>

          <div>
            <button className="btn" onClick={handleBtnContinue}>
              Continue
            </button>
          </div>
        </div>
      );
    }
  }

  if (state === 6) {
    return (
      <div className={style.chooseUsernameContainer}>
        <h1> Felicidades! ya puedes ir al dashboard a crear tus links </h1>
        <Link to="/dashboard"> Continuar </Link>
      </div>
    );
  }

  //
  function handleUserLoggedIng(user) {
    navigate("/dashboard");
  }
  function handleUserNoRegistered(user) {
    setCurrentUser(user);
    setState(3);
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIng}
      onUserNotRegistered={handleUserNoRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div className={style.chooseUsernameContainer}>Loading...</div>
    </AuthProvider>
  );
}
