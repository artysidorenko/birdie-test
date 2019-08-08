import { all, call, put, takeEvery } from 'redux-saga/effects';
import fetch, { Request } from 'node-fetch';
import {
  actions,
  status,
  GetEvents,
  GetFluidIntake,
  GetFoodIntake,
  // GetMedication,
  // GetMoods,
  // GetObservations,
  // GetPadCondition,
  // GetTasks
} from '../types';
import {
  getEventsResponse,
  getFluidIntakeResponse,
  getFoodIntakeResponse,
  // getMedicationResponse,
  // getObservationsResponse,
  // getPadConditionResponse,
  // getMoodsResponse,
  // getTasksResponse
} from '../actions';

// import api_routes from '@App/api_routes.json';
const host = 'http://localhost:8000/';
const prefix = 'api/events';
const fluidRoute = '/fluid_intake_observation';
const foodRoute = '/food_intake_observation';
const suffix = `?id=df50cac5-293c-490d-a06c-ee26796f850d`;

function* getEvents(action: GetEvents) {
  try {
    const response = yield call(fetch, new Request(host + prefix + suffix));
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

function* getFluidIntake(action: GetFluidIntake) {
  try {
    const response = yield call(fetch, new Request(host + prefix + fluidRoute + suffix));
    if (response.status === 200) {
      const data = yield response.json();
      yield put(getFluidIntakeResponse(data, status.SUCCESS));
    } else {
      yield put(getFluidIntakeResponse(response.statusText, status.FAILURE));
    }
  } catch (e) {
    yield put(getFluidIntakeResponse(e, status.FAILURE));
  }
}

function* getFoodIntake(action: GetFoodIntake) {
  try {
    const response = yield call(
      fetch,
      new Request(host + prefix + foodRoute + suffix)
    );
    if (response.status === 200) {
      const data = yield response.json();
      yield put(getFoodIntakeResponse(data, status.SUCCESS));
    } else {
      yield put(getFoodIntakeResponse(response.statusText, status.FAILURE));
    }
  } catch (e) {
    yield put(getFoodIntakeResponse(e, status.FAILURE));
  }
}

function* dataSaga() {
  yield all([
    takeEvery(actions.GET_EVENTS, getEvents),
    takeEvery(actions.GET_FLUID_INTAKE, getFluidIntake),
    takeEvery(actions.GET_FOOD_INTAKE, getFoodIntake)
  ]);
}

export default dataSaga;
