import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import PageLayout from "./layouts/PageLayout";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
    const [authUser] = useAuthState(auth);
    console.log("authUser : ", authUser);

    return (
        <>
            <PageLayout>
                <Routes>
                    <Route
                        exac
                        path="/"
                        element={
                            authUser ? (
                                <p>ir a home</p>
                            ) : (
                                <p>debe ir a LoginPage</p>
                            )
                        }
                    />
                    <Route
                        path="/auth"
                        element={
                            !authUser ? (
                                <AuthPage />
                            ) : (
                                <p> debe ir a homePAge</p>
                            )
                        }
                    />
                    <Route path="/:username" element={<ProfilePage />} />
                </Routes>
            </PageLayout>
        </>
    );
};

export default App;
