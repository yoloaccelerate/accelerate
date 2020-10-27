import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from './reducers/index';
<<<<<<< HEAD

import providerloginAction from'./saga/saga'
=======
// import createSagaMiddleware from 'redux-saga'
// import providerloginAction from'./saga/saga'
>>>>>>> a99d4e44db915ab24bd957a18280f4c4cbc5e7d1
const createBrowserHistory = require("history").createBrowserHistory;
// const sagaMiddleware=createSagaMiddleware()
let store = createStore(rootReducer, applyMiddleware(
  thunk
))
// sagaMiddleware.run(providerloginAction)


let history = createBrowserHistory();

export {
    store,
    history
}