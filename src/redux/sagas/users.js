import axios from 'axios';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from '../actionTypes';
import { axiosClient, responseStatus } from '../../constants';

function* getUserWorker() {
  let errorMessage = '';

  try {
    const { data } = yield axiosClient.get('/user');

    if (data.status === responseStatus.OK) {
      yield put({ type: ActionTypes.GET_USERS_SUCCESS, payload: data.results });
      return
    }

    errorMessage = data.errors.jwt_mdlw_error;
  } catch (error) {
    errorMessage = error.message;
  }
  
  yield put({ type: ActionTypes.GET_USERS_FAILED });

  alert(errorMessage);
}

export default function* appSaga() {
  yield takeLeading(ActionTypes.GET_USERS, getUserWorker);
}