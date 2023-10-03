import React from "react";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import "./index.css";

const main = (
  <Provider store={store}>
    <App />
  </Provider>
);

export default main;
