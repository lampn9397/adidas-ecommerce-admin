import * as ActionTypes from '../actionTypes';

const defaultState = {
  loading: true,
  data: [],
};

export default function categoriesReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.GET_CATEGORIES:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case ActionTypes.GET_CATEGORIES_FAILED:
      return {
        ...state,
        loading: false,
      }

    default: return state;
  }
}