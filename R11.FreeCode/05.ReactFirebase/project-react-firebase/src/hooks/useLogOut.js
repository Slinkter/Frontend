import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";

const useLogOut = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const showToast = useShowToast();
  console.log("useLogOut");

  const handleLogoutf = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      console.log("loggout ");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { handleLogoutf, isLoggingOut, error };
};

export default useLogOut;
