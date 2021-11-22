import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from '../actionTypes';
import { axiosClient, responseStatus } from '../../constants';

function* getBudgetAction() {
    let errorMessage = '';
  
    try {
      const { data } = yield axiosClient.get('/order/admin/detail-budget');
  
      if (data.status === responseStatus.OK) {
        yield put({ type: ActionTypes.GET_BUDGET_SUCCESS, payload: data.results });
        return;
      }
  
      errorMessage = data.errors.jwt_mdlw_error;
    } catch (error) {
      errorMessage = error.response?.data?.errors?.jwt_mdlw_error ?? error.message;
    }
  
    yield put({ type: ActionTypes.GET_BUDGET_FAILED });
  
    alert(errorMessage);
  }

  export default function* appSaga() {
    yield takeLeading(ActionTypes.GET_BUDGET, getBudgetAction);
  }