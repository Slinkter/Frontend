import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./store/store";

const main = (
    <Provider store={store}>
        <App />
    </Provider>
);

export default main;
