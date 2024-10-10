import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App.js";

//redux
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import {
    applyMiddleware,
    compose,
    legacy_createStore as createStore,
} from "redux";
import rootReducer from "./reducers/rootReducer.js";
import { logger } from "./middlewares/index.js";

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhacers = composeAlt(applyMiddleware(thunk, logger));
const store = createStore(rootReducer, composeEnhacers);
//
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
