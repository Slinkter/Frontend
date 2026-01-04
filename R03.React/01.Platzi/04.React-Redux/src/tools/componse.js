import { compose } from "redux";

const composeEnhancers = 
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__)
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : compose;

export { composeEnhancers };
