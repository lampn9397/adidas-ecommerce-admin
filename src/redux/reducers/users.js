import * as ActionTypes from '../actionTypes';

const defaultState = {
  userList: [],
  loading: true,
};

export default function usersReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.GET_USERS:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userList: action.payload,
      }
    case ActionTypes.GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
      }
    case ActionTypes.LOGOUT_DONE:
      return defaultState;
    default: return state;
  }
}