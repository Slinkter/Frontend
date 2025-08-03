import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./store.js";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
        <ToastContainer position="top-center" />
    </Provider>
);
