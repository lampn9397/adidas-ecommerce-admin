import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router';

import rootReducers from './reducers'

export const history = createBrowserHistory();

export const sagaMiddleware = createSagaMiddleware()

export default createStore(
  rootReducers,
  applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware,
  )
);
