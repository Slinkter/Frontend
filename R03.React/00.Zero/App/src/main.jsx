import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { store } from "./store.js";
import "./index.css";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
        <ToastContainer position="top-center" />
    </Provider>
);
