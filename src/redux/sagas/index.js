import { all, fork } from 'redux-saga/effects';

import appSaga from './app';

export default function* rootSaga() {
  yield all([
    fork(appSaga),
  ]);
}
