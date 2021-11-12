import { localStorageKey } from '../../constants';
import * as ActionTypes from '../actionTypes';

const collapsed = localStorage.getItem(localStorageKey.SIDEBAR_COLLAPSED);

const defaultState = {
  collapsed: collapsed === 'true',
};

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        collapsed: !state.collapsed,
      }
    default: return state;
  }
}