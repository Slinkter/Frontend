import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App.js";

//redux
import rootReducer from "./reducers/rootReducer.js";
import { Provider } from "react-redux";
import {
    applyMiddleware,
    compose,
    legacy_createStore as createStore,
} from "redux";
import { logger } from "./middlewares/index.js";
import { thunk } from "redux-thunk";

const root = ReactDOM.createRoot(document.getElementById("root"));

//si se encuentra en el navegadorse utilizara la extension de REDUX DEVTOOL, de lo contrario se utilizara el compose de redux
const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhacers = composeAlt(applyMiddleware(thunk, logger));

const store = createStore(rootReducer, composeEnhacers);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
