import { select, takeLeading } from 'redux-saga/effects';
import { localStorageKey } from '../../constants';

import * as ActionTypes from '../actionTypes';

function* toggleSideBarAction() {
  const collapsed = yield select((state) => state.app.collapsed);

  localStorage.setItem(localStorageKey.SIDEBAR_COLLAPSED, collapsed);
}

export default function* appSaga() {
  yield takeLeading(ActionTypes.TOGGLE_SIDEBAR, toggleSideBarAction);
}