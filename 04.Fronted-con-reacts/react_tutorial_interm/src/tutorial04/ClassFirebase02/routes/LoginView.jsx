import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
//
import style from "./loginView.modele.css";
/* 
    [state, setCurrentState]
    0: inicial
    1: loading
    2: login completo
    3: login pero sin registro
    4: no hay nadie logueado
    5: ya existe el username
    6: nuevo username,click para continuar
    7: userna no existe    
  */

export default function LoginView() {
  const navigate = useNavigate();
  const [state, setCurrentState] = useState(0);

  // Boton de provedor Google
  async function handleOnClick() {
    console.group("Google Provider");
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);

    async function signInWithGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
    console.groupEnd();
  }

  if (state === 4) {
    return (
      <div className="loginView">
        <div>
          <h1> link tree</h1>
          <h3> stado : {state}</h3>
        </div>
        <button className="provider" onClick={handleOnClick}>
          Login with Google
        </button>
      </div>
    );
  }

  if (state === 5) {
  }

  function handleUserLoggedIng(user) {
    navigate("/dashboard");
  }
  function handleUserNotLoggedIn() {
    setCurrentState(4);
  }
  function handleUserNoRegistered(user) {
    navigate("/choose-username");
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIng}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNoRegistered}
    >
      <div className="loginView"> Loading ... </div>
    </AuthProvider>
  );
}
