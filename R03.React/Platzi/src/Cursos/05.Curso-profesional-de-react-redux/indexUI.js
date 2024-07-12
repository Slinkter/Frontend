// librerias
import React from "react";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
// Desarrollo
import { pokemonsReducer as reducer } from "./tools/reducer";
import { initialState as state } from "./tools/inititalState";
import { componsedEnhacers as componse } from "./tools/componsedEnhacers";
// componente
import App from "./App";
//
const store = createStore(reducer, state, componse);
console.log(store);
//
const ProviderStore = (
    <Provider store={store}>
        <App />
    </Provider>
);

export default ProviderStore;
