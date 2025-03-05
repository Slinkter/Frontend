import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <RouterProvider router={router} />
        <ToastContainer />
    </>
);
