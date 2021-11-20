import { push } from 'connected-react-router';
import { put, select, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from '../actionTypes';
import { axiosClient, responseStatus, routes } from '../../constants';

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

function* updateProductAction(action) {
  let errorMessage = '';

  try {
    const { payload } = action;
    const selectedProduct = yield select((state) => state.products.selectedProduct);

    const formData = new FormData();

    formData.append('name', payload.name);
    formData.append('category_id', selectedProduct.category_id);
    formData.append('price', payload.price);
    formData.append('description', payload.description);

    const { data } = yield axiosClient.post(`/product/${selectedProduct.id}`, formData);

    if (data.status === responseStatus.OK) {
      yield put({ type: ActionTypes.UPDATE_PRODUCT_SUCCESS, payload: action.payload });
      return;
    }

    errorMessage = data.errors.jwt_mdlw_error;
  } catch (error) {
    errorMessage = error.message;
  }

  yield put({ type: ActionTypes.UPDATE_PRODUCT_FAILED });

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
  yield takeLeading(ActionTypes.UPDATE_PRODUCT, updateProductAction);
  yield takeLeading(ActionTypes.DELETE_PRODUCT, deleteProductAction);
  yield takeLeading(ActionTypes.SELECT_PRODUCT, selectProductAction);
}