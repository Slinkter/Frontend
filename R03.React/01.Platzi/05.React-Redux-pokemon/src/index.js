import ReactDOM from "react-dom/client";
//redux
import { Provider } from "react-redux"; // El Provider se usa para conectar Redux con React,
import { legacy_createStore } from "redux"; // `legacy_createStore` es la forma anterior de crear un store de Redux. Se usa aquí por compatibilidad.
import { thunk } from "redux-thunk"; //Para funciones asíncronas en Redux.
import { compose } from "redux"; // Compose permite  Redux DevTools.
import { applyMiddleware } from "redux"; //  aplicar middlewares al store de Redux.
//
import rootReducer from "./reducers/rootReducer.js"; // la combinación de todos los reducers de la aplicación.
import { logger } from "./middlewares/index.js";
import App from "./App/App.js";

// Configura Redux DevTools o usa `compose` si no está disponible.
// Combina `thunk` y `logger` como middlewares. Esto permite que el store use funciones asíncronas (thunk) y registre las acciones (logger).
// Crea el store de Redux utilizando el `rootReducer` y los middlewares configurados.

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhacers = composeAlt(applyMiddleware(thunk, logger));
const store = legacy_createStore(rootReducer, composeEnhacers);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
