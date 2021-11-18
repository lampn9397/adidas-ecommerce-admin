import * as ActionTypes from '../actionTypes';

const defaultState = {
  orderList: [],
  loading: true,
};

export default function ordersReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.GET_ORDERS:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orderList: action.payload,
      }
    case ActionTypes.GET_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
      }
    case ActionTypes.LOGOUT_DONE:
      return defaultState;
    default: return state;
  }
}