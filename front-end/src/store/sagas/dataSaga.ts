import { all, call, put, takeEvery } from 'redux-saga/effects';
import fetch, { Request } from 'node-fetch';
import {
  actions,
  status,
  GetEvents,
  // GetFluidIntake,
  // GetFoodIntake,
  // GetMedication,
  // GetMoods,
  // GetObservations,
  // GetPadCondition,
  // GetTasks
} from '../types';
// import StatisticsService from '@App/services/statistics.service';
// import { getToken } from '../selectors';
import {
  getEventsResponse,
  // getFluidIntakeResponse,
  // getFoodIntakeResponse,
  // getMedicationResponse,
  // getObservationsResponse,
  // getPadConditionResponse,
  // getMoodsResponse,
  // getTasksResponse
} from '../actions';

// import api_routes from '@App/api_routes.json';
const apiRoute = `http://localhost:8000/api/events?id=df50cac5-293c-490d-a06c-ee26796f850d`;
// const options = { mode: 'no-cors' };
const request = new Request(`${apiRoute}`);

function* getEvents(action: GetEvents) {
  try {
    const response = yield call(fetch, request);
    if (response.status === 200) {
      const data = yield response.json();
      yield put(getEventsResponse(data, status.SUCCESS));
    } else {
      yield put(getEventsResponse(response.statusText, status.FAILURE));
    }
  } catch (e) {
    yield put(getEventsResponse(e, status.FAILURE));
  }
}

function* dataSaga() {
  yield all([
    takeEvery(actions.GET_EVENTS, getEvents),
  ]);
}

export default dataSaga;
