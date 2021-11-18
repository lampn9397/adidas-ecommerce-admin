import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from '../actionTypes';
import { axiosClient, responseStatus, routes } from '../../constants';
import { push } from 'connected-react-router';

function* getProducts() {
  let errorMessage = '';

  try {
    const { data } = yield axiosClient.get('/product');

    if (data.status === responseStatus.OK) {
      yield put({ type: ActionTypes.GET_PRODUCTS_SUCCESS, payload: data.results });
      return
    }

    errorMessage = data.errors.jwt_mdlw_error;
  } catch (error) {
    errorMessage = error.message;
  }

  yield put({ type: ActionTypes.GET_PRODUCTS_FAILED });

  alert(errorMessage);
}

function* deleteProductAction(action) {
  let errorMessage = '';

  try {
    const { id } = action.payload;

    const { data } = yield axiosClient.delete('/product', {
      data: {
        ids: [id]
      }
    });

    if (data.status === responseStatus.OK) {
      yield put({ type: ActionTypes.DELETE_PRODUCT_SUCCESS, payload: action.payload });
      return;
    }

    errorMessage = data.errors.jwt_mdlw_error;
  } catch (error) {
    errorMessage = error.message;
  }

  yield put({ type: ActionTypes.DELETE_PRODUCT_FAILED });

  alert(errorMessage);
}

function* selectProductAction() {
  yield put(push(routes.PRODUCT_DETAIL.path));
}

export default function* appSaga() {
  yield takeLeading(ActionTypes.GET_PRODUCTS, getProducts);
  yield takeLeading(ActionTypes.DELETE_PRODUCT, deleteProductAction);
  yield takeLeading(ActionTypes.SELECT_PRODUCT, selectProductAction);
}