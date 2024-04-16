import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "./index.css";

const main = (
  <Provider store={store}>
    <App />
  </Provider>
);

export default main;
