import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App.js"; // Importa el componente principal de la aplicación.

//redux
import { Provider } from "react-redux"; // El Provider se usa para conectar Redux con React,
import { thunk } from "redux-thunk"; // Redux Thunk es un middleware que permite manejar funciones asíncronas en Redux.
import {
    applyMiddleware, // Esta función se usa para aplicar middlewares al store de Redux.
    compose, // Compose permite combinar middlewares y herramientas como Redux DevTools.
    legacy_createStore as createStore, // `legacy_createStore` es la forma anterior de crear un store de Redux. Se usa aquí por compatibilidad.
} from "redux";
//
import rootReducer from "./reducers/rootReducer.js"; // Importa el `rootReducer`, que es la combinación de todos los reducers de la aplicación.
import { logger } from "./middlewares/index.js"; // Importa un middleware personalizado llamado `logger` que probablemente loguea acciones de Redux.

// Configura Redux DevTools o usa `compose` si no está disponible.
const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Combina `thunk` y `logger` como middlewares. Esto permite que el store use funciones asíncronas (thunk) y registre las acciones (logger).
const composeEnhacers = composeAlt(applyMiddleware(thunk, logger));

// Crea el store de Redux utilizando el `rootReducer` y los middlewares configurados.
const store = createStore(rootReducer, composeEnhacers);

// Crea el nodo raíz de la aplicación en el DOM.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza la aplicación dentro del `Provider` de Redux, lo que permite que toda la aplicación acceda al store.
root.render(
    <Provider store={store}>
        <App /> {/* El componente principal `App` se renderiza aquí. */}
    </Provider>
);
