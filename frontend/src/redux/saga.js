import { all } from 'redux-saga/effects';
import { saga as scheduleSaga } from '../ducks/schedule';
// import {saga as authSaga} from '../ducks/auth'
// import {saga as eventsSaga} from '../ducks/events'

export default function* rootSaga() {
  yield all([
    scheduleSaga()
    // authSaga(),
    // eventsSaga()
  ]);
}
