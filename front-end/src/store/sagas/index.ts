import { all, spawn } from 'redux-saga/effects';

import dataSaga from './dataSaga';

function* initSaga() {
  yield all([spawn(dataSaga)]);
}

export default initSaga;