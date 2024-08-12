import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import { auth } from "./firebase/firebase";
/*  */
import PageLayout from "./Layout/PageLayout";
/*  */
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import ProfilePage from "./Pages/ProfilePage";
/*  */
import "./App.css";

function App() {
    //custom hook
    const [authUser] = useAuthState(auth);
    //
    console.log("authUser : ", authUser);
    const routeHome = authUser ? <HomePage /> : <Navigate to="/auth" />;
    const routeAuth = !authUser ? <AuthPage /> : <Navigate to="/" />;

    return (
        <PageLayout>
            <Routes>
                <Route exac path="/" element={routeHome} />
                <Route path="/auth" element={routeAuth} />
                <Route path="/:username" element={<ProfilePage />} />
                <Route path="*" element={<p>404 </p>} />
            </Routes>
        </PageLayout>
    );
}

export default App;

/* Ruta dinamica :  */
