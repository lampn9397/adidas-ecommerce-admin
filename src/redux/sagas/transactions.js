import { push } from 'connected-react-router';
import { put, call, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from '../actionTypes';
import { apiErrorHandler } from '../../utils';
import { axiosClient, responseStatus, routes } from '../../constants';

function* getTransactions() {
  let errorMessage = '';

  try {
    const { data } = yield axiosClient.get('/transaction');

    if (data.status === responseStatus.OK) {
      yield put({ type: ActionTypes.GET_TRANSACTIONS_SUCCESS, payload: data.results });
      return
    }

    errorMessage = data.errors.jwt_mdlw_error;
  } catch (error) {
    errorMessage = error.response?.data?.errors?.jwt_mdlw_error ?? error.message;
  }
  
  yield put({ type: ActionTypes.GET_TRANSACTIONS_FAILED });

  yield call(apiErrorHandler, errorMessage);
}

function* selectTransaction() {
  yield put(push(routes.ORDER_DETAIL.path));
}

export default function* appSaga() {
  yield takeLeading(ActionTypes.GET_TRANSACTIONS, getTransactions);
  yield takeLeading(ActionTypes.SELECT_TRANSACTION, selectTransaction);
}