import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import { connectRouter } from "connected-react-router";

import user from "./modules/user";
import post from "./modules/post";

const history = createBrowserHistory();
const middlewares = [thunk.withExtraArgument({ history })];

const env = process.env.NODE_ENV;
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const rootReducer = combineReducers({
  user,
  post,
  router: connectRouter(history),
});

const store = createStore(rootReducer, enhancer);

export { history };
export default store;
