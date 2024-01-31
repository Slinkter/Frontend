import React from "react";
import ReactDOM from "react-dom/client";

// Router DOM
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pestañas
import App from "./App";
import LoginView from "./routes/LoginView";
import DashboardView from "./routes/DashboardView";
import EditProfileView from "./routes/EditProfileView";
import SignOutView from "./routes/SignOutView";
import PublicProfileView from "./routes/PublicProfileView"; // ruta dinamica ":username" se ha ser cambiado por otro texto
import ChooseUsernameView from "./routes/ChooseView"; // despues de logear-autenticar , se crea una cuenta y usuario
//. style
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
//
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<LoginView />} />
      <Route path="dashboard" element={<DashboardView />} />
      <Route path="dashboard/profile" element={<EditProfileView />} />
      <Route path="signout" element={<SignOutView />} />
      <Route path="u/:username" element={<PublicProfileView />} />
      <Route path="choose-username" element={<ChooseUsernameView />} />
    </Routes>
  </BrowserRouter>
);
