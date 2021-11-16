import { all, fork } from 'redux-saga/effects';

import appSaga from './app';
import usersSaga from './users';

export default function* rootSaga() {
  yield all([
    fork(appSaga),
    fork(usersSaga),
  ]);
}
