import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

function useLogOut() {
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    console.log(error);
    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.log(error, error.message);
        }
    };

    return { handleLogout, isLoggingOut };
}

export default useLogOut;
