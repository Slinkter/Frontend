import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import PageLayout from "./Layout/PageLayout";
import {
    useAuthState,
    useSignInWithEmailAndPassword,
    useSignOut,
} from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { signOut } from "firebase/auth";

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

    return (
        <>
            <PageLayout>
                <Routes>
                    <Route />
                    <Route />
                    <Route />
                </Routes>
            </PageLayout>

            {activeUser && activeUser.user.email}
            <br />

            <br />
            <Button
                colorScheme="teal"
                size="sm"
                variant="outline"
                onClick={handLogin}
            >
                Ingresar
            </Button>
            <Button
                colorScheme="teal"
                size="sm"
                variant="outline"
                onClick={handLogout}
            >
                Salir
            </Button>
        </>
    );
}

export default App;
