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

import apiRoutes from '../../utils/apiRoutes';

const { host, endpoints, query_prefix } = apiRoutes;

function* getEvents(action: GetEvents) {
  try {
    const response = yield call(fetch, new Request(host + endpoints.getEvents + query_prefix + action.id));
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
    const response = yield call(
      fetch,
      new Request(host + endpoints.getFluidIntake + query_prefix + action.id)
    );
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
      new Request(host + endpoints.getFoodIntake + query_prefix + action.id)
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
      new Request(host + endpoints.getMoods + query_prefix + action.id)
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
      new Request(host + endpoints.getMedication.taken + query_prefix + action.id)
    );
    const response2 = yield call(
      fetch,
      new Request(host + endpoints.getMedication.not_taken + query_prefix + action.id)
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
      new Request(host + endpoints.getPadCondition + query_prefix + action.id)
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
      new Request(host + endpoints.getTasks.completed + query_prefix + action.id)
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
