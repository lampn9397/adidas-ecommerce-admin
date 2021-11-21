import { put, takeLeading } from 'redux-saga/effects';
import { axiosClient, responseStatus } from '../../constants';

import * as ActionTypes from '../actionTypes';

function* getCategories() {
  let errorMessage = 'Failed to get categories';

  try {
    const { data } = yield axiosClient.get('/category');

    if (data.status === responseStatus.OK) {
      yield put({ type: ActionTypes.GET_CATEGORIES_SUCCESS, payload: data.results });
      return;
    }

    errorMessage = data.errors?.jwt_mdlw_error ?? errorMessage;
  } catch (error) {
    errorMessage = error.response?.data?.errors?.jwt_mdlw_error ?? error.message;
  }

  yield put({ type: ActionTypes.GET_CATEGORIES_FAILED });

  alert(errorMessage);
}

export default function* categoriesSaga() {
  yield takeLeading(ActionTypes.GET_CATEGORIES, getCategories);
}