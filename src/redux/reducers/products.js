import * as ActionTypes from '../actionTypes';

const defaultState = {
  productList: [],
  loading: true,
};

export default function productReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        productList: action.payload,
      }
    case ActionTypes.GET_PRODUCTS_FAILED:
      return {
        ...state,
        loading: false,
      }
    case ActionTypes.LOGOUT_DONE:
      return defaultState;
    default: return state;
  }
}