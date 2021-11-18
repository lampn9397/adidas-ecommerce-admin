import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from './app';
import usersReducer from './users';
import productReducer from './products';
import ordersReducer from './orders';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  app: appReducer,
  users: usersReducer,
  products: productReducer,
  orders: ordersReducer,
});

export default createRootReducer;