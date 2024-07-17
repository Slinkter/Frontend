import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { auth } from "./firebase/firebase";
import {
    useAuthState,
    useSignInWithEmailAndPassword,
    useSignOut,
} from "react-firebase-hooks/auth";
<<<<<<< HEAD
import { auth } from "./firebase/firebase";

=======
/*  */
import PageLayout from "./Layout/PageLayout";
>>>>>>> 119003f72fac86cf0c2aade014b8bc67ec64554b
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import ProfilePage from "./Pages/ProfilePage";

import "./App.css";

function App() {
    //custom hook
    const [authUser] = useAuthState(auth);

    return (
        <PageLayout>
            <Routes>
                <Route
                    exac
                    path="/"
                    element={authUser ? <HomePage /> : <Navigate to="/auth" />}
                />
                <Route
                    path="/auth"
                    element={!authUser ? <AuthPage /> : <Navigate to="/" />}
                />
                <Route path="/:username" element={<ProfilePage />} />
                <Route path="*" element={<p>404 </p>} />
            </Routes>
        </PageLayout>
    );
}

export default App;

/* 

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [signOut] = useSignOut(auth);
    const [activeUser, setActiveUser] = useState(null);
    //
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


            {authUser && authUser?.email}
            <br />
            <p style={{ textAlign: "left" }}>
                {JSON.stringify(authUser?.uid, null, 2)}
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
  

    console.log(authUser);
 <PageLayout>
                <Routes>
                    <Route
                        path="/"
                        element={
                            authUser ? <HomePage /> : <Navigate to="/auth" />
                        }
                    />
                    <Route
                        path="/auth"
                        element={!authUser ? <AuthPage /> : <Navigate to="/" />}
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



*/
