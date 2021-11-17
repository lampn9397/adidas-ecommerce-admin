import * as ActionTypes from '../actionTypes';

const defaultState = {
  userList: [],
  loading: true,
  deleteLoading: false,
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
    case ActionTypes.DELETE_USER:
      return {
        ...state,
        deleteLoading: true,
      }
    case ActionTypes.DELETE_USER_SUCCESS: {
      const userList = JSON.parse(JSON.stringify(state.userList));

      const userIndex = userList.findIndex((x) => x.id === action.payload.id);

      if (userIndex > -1) {
        userList.splice(userIndex, 1);
      }

      return {
        ...state,
        userList,
        deleteLoading: false,
      }
    }
    case ActionTypes.DELETE_USER_FAILED:
      return {
        ...state,
        deleteLoading: false,
      }
    case ActionTypes.LOGOUT_DONE:
      return defaultState;
    default: return state;
  }
}