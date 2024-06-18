// src/App.jsx
import React from "react";
import { Box, Button, useColorMode } from "@chakra-ui/react";

import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";

import PageLayout from "./Layout/PageLayout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [authUser] = useAuthState(auth);

  const isAuth = authUser ? <HomePage /> : <Navigate to="/auth" />;
  const isNotAuth = !authUser ? <AuthPage /> : <Navigate to="/" />;

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={isAuth} />
        <Route path="/auth" element={isNotAuth} />
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
</Box>;
 */
