import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
// --> context
import { AuthProvider, AuthRoute } from "./provider/auth";
// AuthProvider, AuthRoute, useAuth;
// ---> Page
import Menu from "./Page/Menu";
import BlogPage from "./Page/BlogPage";
import BlogPost from "./Page/BlogPost";
import HomePage from "./Page/HomePage";
import LoginPage from "./Page/LoginPage";
import LogoutPage from "./Page/LogoutPage";
import ProfilePage from "./Page/ProfilePage";

/*
/#/
/#/blog
/#/profile
/#/dasdasdadsa

HashRouter:

Aplicaciones alojadas en servidores antiguos: Si tu aplicación se va a desplegar en un servidor con una configuración antigua, es posible que no tenga habilitado el History API.

¿Qué es el History API?

El History API es una interfaz del navegador que permite manipular el historial de navegación de una manera más flexible

Si tu servidor soporta el History API: Utiliza BrowserRouter.
Si tu servidor no soporta el History API: Utiliza HashRouter.


*/

const index = () => {
    return (
        <>
            <HashRouter>
                <AuthProvider>
                    <Menu />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/logout" element={<LogoutPage />} />

                        <Route path="/blog" element={<BlogPage />}>
                            <Route path=":slug" element={<BlogPost />} />
                        </Route>

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
