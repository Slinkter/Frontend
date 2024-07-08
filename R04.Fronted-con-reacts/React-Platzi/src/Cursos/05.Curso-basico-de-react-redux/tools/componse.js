import { compose } from "redux";
const wx = window.__REDUX_DEVTOOLS_EXTENSION__;
const wy = window.__REDUX_DEVTOOLS_EXTENSION__();
const composeEnhancers = (wx && wy) || compose;
export { composeEnhancers };
