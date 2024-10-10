import { combineReducers } from "redux"; //  la función combineReducers  permite combinar varios reducers.
import dataReducer from "../slices/dataSlice"; // Importa el reducer que maneja el estado relacionado con los datos (probablemente de la API o de la aplicación).
import uiReducer from "../slices/uiSlice"; // Importa el reducer que maneja el estado relacionado con la interfaz de usuario (como el modo oscuro, loaders, etc.).

// Combina ambos reducers en un solo reducer.
// Esto crea un estado global donde "data" será manejado por `dataReducer` y "ui" por `uiReducer`.
const rootReducer = combineReducers({
    data: dataReducer, // El estado relacionado con los datos será manejado por `dataReducer`.
    ui: uiReducer, // El estado relacionado con la UI será manejado por `uiReducer`.
});

export default rootReducer; // Exporta el rootReducer para que sea usado en la configuración del store de Redux.
