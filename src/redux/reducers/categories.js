import * as ActionTypes from '../actionTypes';

const defaultState = {
  loading: true,
  categoryList: [],
  deleteLoading: false,
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
        categoryList: action.payload,
      }
    case ActionTypes.GET_CATEGORIES_FAILED:
      return {
        ...state,
        loading: false,
      }

    case ActionTypes.DELETE_CATEGORY:
      return {
        ...state,
        deleteLoading: true,
      }
    case ActionTypes.DELETE_CATEGORY_SUCCESS: {
      const updateStates = { deleteLoading: false };

      const categoryIndex = state.categoryList.findIndex((x) => x.id === action.payload.id);

      if (categoryIndex > -1) {
        updateStates.categoryList = JSON.parse(JSON.stringify(state.categoryList));

        updateStates.categoryList.splice(categoryIndex, 1);
      }

      return {
        ...state,
        ...updateStates,
        // categoryList: action.payload,
      }
    }
    case ActionTypes.DELETE_CATEGORY_FAILED:
      return {
        ...state,
        deleteLoading: false,
      }

    default: return state;
  }
}