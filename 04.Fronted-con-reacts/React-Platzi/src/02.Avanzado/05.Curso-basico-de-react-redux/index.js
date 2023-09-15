// Library
import React from "react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
// component
import App from "./routes/App";
// external
import { reducer } from "./tools/reducer";
import { initialState } from "./tools/initialState";
import { composeEnhancers } from "./tools/componse";
//
const store = legacy_createStore(reducer, initialState, composeEnhancers);
//
const PAPP = (
  <Provider store={store}>
    <App />
  </Provider>
);

export default PAPP;
