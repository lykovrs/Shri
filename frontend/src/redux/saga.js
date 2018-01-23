import { all } from 'redux-saga/effects';
import { saga as roomsSaga } from '../ducks/rooms';
import { saga as eventsSaga } from '../ducks/events';

export default function* rootSaga() {
  yield all([roomsSaga(), eventsSaga()]);
}
