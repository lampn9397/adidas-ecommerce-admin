import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from '../actionTypes';
import { axiosClient, responseStatus } from '../../constants';

function* getUserAction() {
  let errorMessage = '';

  try {
    const { data } = yield axiosClient.get('/user');

    if (data.status === responseStatus.OK) {
      yield put({ type: ActionTypes.GET_USERS_SUCCESS, payload: data.results });
      return;
    }

    errorMessage = data.errors.jwt_mdlw_error;
  } catch (error) {
    errorMessage = error.message;
  }

  yield put({ type: ActionTypes.GET_USERS_FAILED });

  alert(errorMessage);
}

function* deleteUserAction(action) {
  let errorMessage = '';

  try {
    const { id } = action.payload;

    const { data } = yield axiosClient.delete('/user', {
      data: {
        ids: [id]
      }
    });

    if (data.status === responseStatus.OK) {
      yield put({ type: ActionTypes.DELETE_USER_SUCCESS, payload: action.payload });
      return;
    }

    errorMessage = data.errors.jwt_mdlw_error;
  } catch (error) {
    errorMessage = error.message;
  }

  yield put({ type: ActionTypes.DELETE_USER_FAILED });

  alert(errorMessage);
}

export default function* appSaga() {
  yield takeLeading(ActionTypes.GET_USERS, getUserAction);
  yield takeLeading(ActionTypes.DELETE_USER, deleteUserAction);
}