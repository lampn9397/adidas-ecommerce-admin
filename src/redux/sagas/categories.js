import { call, put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from '../actionTypes';
import { apiErrorHandler } from '../../utils';
import { axiosClient, responseStatus } from '../../constants';

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

  yield call(apiErrorHandler, errorMessage);
}

function* deleteCategory(action) {
  let errorMessage = 'Failed to delete categories';

  try {
    const { payload } = action;

    const { data } = yield axiosClient.delete('/category', {
      data: { ids: [payload.id] }
    });

    if (data.status === responseStatus.OK) {
      yield put({ type: ActionTypes.DELETE_CATEGORY_SUCCESS, payload });
      return;
    }

    errorMessage = data.errors?.jwt_mdlw_error ?? errorMessage;
  } catch (error) {
    errorMessage = error.response?.data?.errors?.jwt_mdlw_error ?? error.message;
  }

  yield put({ type: ActionTypes.DELETE_CATEGORY_FAILED });

  yield call(apiErrorHandler, errorMessage);
}

export default function* categoriesSaga() {
  yield takeLeading(ActionTypes.GET_CATEGORIES, getCategories);
  yield takeLeading(ActionTypes.DELETE_CATEGORY, deleteCategory);
}