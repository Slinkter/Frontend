import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { useEffect, useState } from "react";
import { logout } from "../firebase/firebase";

export default function SignOutView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  async function handleUserLoggedIng(user) {
    await logout();
  }

  function handleUserNoRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }


  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIng}
      onUserNotRegistered={handleUserNoRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    ></AuthProvider>
  );
}
