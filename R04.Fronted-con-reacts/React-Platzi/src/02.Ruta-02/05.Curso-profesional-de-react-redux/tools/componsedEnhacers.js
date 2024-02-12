import { compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { logger } from "./middlewares";
//
const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // redux
const componsedEnhacers = composeAlt(applyMiddleware(thunk, logger)); //redux
//w
export { componsedEnhacers };
