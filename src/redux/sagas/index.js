import {
  all,
  // fork
} from 'redux-saga/effects';

// import authSaga from './sagas/auth';

export default function* rootSaga() {
  yield all([
    // fork(authSaga),
  ]);
}
