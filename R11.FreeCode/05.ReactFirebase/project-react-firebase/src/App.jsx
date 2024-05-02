import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import PageLayout from "./Layout/PageLayout";
import ProfilePage from "./pages/ProfilePage";
/* import useAuthStore from "../store/authStore"; */
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

const App = () => {
  /*  const authUser = useAuthStore((state) => state.user); */

  const [authUser] = useAuthState(auth);

  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/auth"} />}
        />
        <Route
          path="/auth"
          element={!authUser ? <AuthPage /> : <Navigate to={"/"} />}
        />
        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
};

export default App;
