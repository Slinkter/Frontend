// src/App.jsx
import React from "react";
import { Box, Button, useColorMode } from "@chakra-ui/react";
import PageLayout from "./Layout/PageLayout";
import { Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import HomePage from "./pages/HomePage";
import { Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import useLogout from "./hooks/useLogout";
import ProfilePage from "./pages/ProfilePage";

function App() {
    const [authUser] = useAuthState(auth);

    return (
        <PageLayout>
            <Routes>
                <Route
                    path="/"
                    element={authUser ? <HomePage /> : <Navigate to="/auth" />}
                />
                <Route
                    path="/auth"
                    element={!authUser ? <AuthPage /> : <Navigate to="/" />}
                />
                <Route path="/:username" element={<ProfilePage />} />
            </Routes>
        </PageLayout>
    );
}

export default App;

/* 

  const { colorMode, toggleColorMode } = useColorMode();
    const { handleLogout, loading, error } = useLogout();
   <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                bg={colorMode === "light" ? "white" : "gray.800"}
            >
                <Button onClick={toggleColorMode}>
                    Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
                <Button onClick={handleLogout}>out</Button>
            </Box>



*/
