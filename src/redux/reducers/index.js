import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from './app';
import usersReducer from './users';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  app: appReducer,
  users: usersReducer,
});

export default createRootReducer;