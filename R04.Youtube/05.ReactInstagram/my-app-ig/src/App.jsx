import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./Layout/PageLayout";
import {
    useAuthState,
    useSignInWithEmailAndPassword,
    useSignOut,
} from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { signOut } from "firebase/auth";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
    //custom hook
    const [authUser] = useAuthState(auth);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [signOut] = useSignOut(auth);
    const [activeUser, setActiveUser] = useState(null);

    async function handLogout() {
        await signOut();
        setActiveUser(null);
    }
    async function handLogin() {
        const response = await signInWithEmailAndPassword(
            "liam@glass.com",
            "liamglass"
        );
        setActiveUser(response);
    }

    console.log(authUser);
    return (
        <>
            <PageLayout>
                <Routes>
                    <Route
                        path="/"
                        element={
                            authUser ? <HomePage /> : <Navigate to={"/auth"} />
                        }
                    />
                    <Route
                        path="/auth"
                        element={
                            !authUser ? <AuthPage /> : <Navigate to={"/"} />
                        }
                    />
                    <Route path="/:username" element={<ProfilePage />} />
                </Routes>
            </PageLayout>

            {activeUser && activeUser.user.email}
            <br />
            <p style={{ textAlign: "left" }}>
                {JSON.stringify(authUser, null, 2)}
            </p>
            <br />
            <Button
                w={"150px"}
                colorScheme="teal"
                size="sm"
                variant="outline"
                onClick={handLogin}
                m={"20px"}
            >
                Ingresar
            </Button>
            <Button
                w={"150px"}
                colorScheme="teal"
                size="sm"
                variant="outline"
                onClick={handLogout}
                m={"20px"}
            >
                Salir
            </Button>
        </>
    );
}

export default App;
