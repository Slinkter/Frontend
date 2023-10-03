import React from "react";
import { createStore } from "redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
//import { createBrowserHistory } from "@remix-run/router";
import initialState from "../data/initialState";
import reducer from "../reducers";

//
const store = createStore(reducer, initialState);
const history = createBrowserHistory();

const ProviderMock = (props) => {
    <Provider store={store}>
        <Route history={history}>{props.children}</Route>
    </Provider>;
};

export default ProviderMock;
