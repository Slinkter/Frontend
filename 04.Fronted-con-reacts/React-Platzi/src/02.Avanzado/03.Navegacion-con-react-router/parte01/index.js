import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
// --> context
import { AuthProvider, AuthRoute } from "./provider/auth";
// ---> Page
import Menu from "./Page/Menu";
import BlogPage from "./Page/BlogPage";
import BlogPost from "./Page/BlogPost";
import HomePage from "./Page/HomePage";
import LoginPage from "./Page/LoginPage";
import LogoutPage from "./Page/LogoutPage";
import ProfilePage from "./Page/ProfilePage";

const index = () => {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Menu />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />}>
              <Route path=":slug" element={<BlogPost />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route
              path="/profile"
              element={
                <AuthRoute>
                  <ProfilePage />
                </AuthRoute>
              }
            />
            <Route path="*" element={<p> Not Found </p>} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  );
};

export default index;
/*
/#/
/#/blog
 /#/profile
/#/dasdasdadsa
*/
