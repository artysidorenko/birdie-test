import { all, call, put, takeEvery } from 'redux-saga/effects';
import fetch, { Request } from 'node-fetch';
import {
  actions,
  status,
  GetEvents,
  GetFluidIntake,
  GetFoodIntake,
  GetMedication,
  GetMoods,
  GetPadCondition,
  GetTasks
} from '../types';
import {
  getEventsResponse,
  getFluidIntakeResponse,
  getFoodIntakeResponse,
  getMedicationResponse,
  getPadConditionResponse,
  getMoodsResponse,
  getTasksResponse
} from '../actions';

// import api_routes from '@App/api_routes.json';
const host = 'http://localhost:8000/';
const prefix = 'api/events';
const fluidRoute = '/fluid_intake_observation';
const foodRoute = '/food_intake_observation';
const moodRoute = '/mood_observation';
const medicationRoute1 = '/regular_medication_taken';
const medicationRoute2 = '/regular_medication_not_taken';
const padRoute = '/incontinence_pad_observation';
const tasksRoute = '/task_completed';
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

function* getMoods(action: GetMoods) {
  try {
    const response = yield call(
      fetch,
      new Request(host + prefix + moodRoute + suffix)
    );
    if (response.status === 200) {
      const data = yield response.json();
      yield put(getMoodsResponse(data, status.SUCCESS));
    } else {
      yield put(getMoodsResponse(response.statusText, status.FAILURE));
    }
  } catch (e) {
    yield put(getMoodsResponse(e, status.FAILURE));
  }
}

function* getMedication(action: GetMedication) {
  try {
    const response1 = yield call(
      fetch,
      new Request(host + prefix + medicationRoute1 + suffix)
    );
    const response2 = yield call(
      fetch,
      new Request(host + prefix + medicationRoute2 + suffix)
    );
    if (response1.status === 200 && response2.status === 200) {
      const data1 = yield response1.json();
      const data2 = yield response2.json();
      const data = [...data1, ...data2];
      yield put(getMedicationResponse(data, status.SUCCESS));
    } else {
      yield put(getMedicationResponse([response1.statusText, response2.statusText], status.FAILURE));
    }
  } catch (e) {
    yield put(getMedicationResponse(e, status.FAILURE));
  }
}

function* getPadCondition(action: GetPadCondition) {
  try {
    const response = yield call(
      fetch,
      new Request(host + prefix + padRoute + suffix)
    );
    if (response.status === 200) {
      const data = yield response.json();
      yield put(getPadConditionResponse(data, status.SUCCESS));
    } else {
      yield put(getPadConditionResponse(response.statusText, status.FAILURE));
    }
  } catch (e) {
    yield put(getPadConditionResponse(e, status.FAILURE));
  }
}

function* getTasks(action: GetTasks) {
  try {
    const response = yield call(
      fetch,
      new Request(host + prefix + tasksRoute + suffix)
    );
    if (response.status === 200) {
      const data = yield response.json();
      yield put(getTasksResponse(data, status.SUCCESS));
    } else {
      yield put(getTasksResponse(response.statusText, status.FAILURE));
    }
  } catch (e) {
    yield put(getTasksResponse(e, status.FAILURE));
  }
}

function* dataSaga() {
  yield all([
    takeEvery(actions.GET_EVENTS, getEvents),
    takeEvery(actions.GET_FLUID_INTAKE, getFluidIntake),
    takeEvery(actions.GET_FOOD_INTAKE, getFoodIntake),
    takeEvery(actions.GET_MOODS, getMoods),
    takeEvery(actions.GET_MEDICATION, getMedication),
    takeEvery(actions.GET_PAD_CONDITION, getPadCondition),
    takeEvery(actions.GET_TASKS, getTasks)
  ]);
}

export default dataSaga;
