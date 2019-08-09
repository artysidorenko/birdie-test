import {
  ActionTypes,
  actions,
  FluidIntake,
  FoodIntake,
  Medication,
  Mood,
  Observation,
  PadCondition,
  status,
  Event,
  Task
} from '../types';

// INITIATORS
export function setID(id: string): ActionTypes {
  return {
    type: actions.SET_ID,
    id: id
  };
}
export function getEvents(id: string): ActionTypes {
  return {
    type: actions.GET_EVENTS,
    id: id
  };
}
export function getFluidIntake(id: string): ActionTypes {
  return {
    type: actions.GET_FLUID_INTAKE,
    id: id
  };
}
export function getFoodIntake(id: string): ActionTypes {
  return {
    type: actions.GET_FOOD_INTAKE,
    id: id
  };
}
export function getMedication(id: string): ActionTypes {
  return {
    type: actions.GET_MEDICATION,
    id: id
  };
}
export function getMoods(id: string): ActionTypes {
  return {
    type: actions.GET_MOODS,
    id: id
  };
}
export function getObservations(id: string): ActionTypes {
  return {
    type: actions.GET_OBSERVATIONS,
    id: id
  };
}
export function getPadCondition(id: string): ActionTypes {
  return {
    type: actions.GET_PAD_CONDITION,
    id: id
  };
}
export function getTasks(id: string): ActionTypes {
  return {
    type: actions.GET_TASKS,
    id: id
  };
}

// RESPONSE ACTIONS
export function getEventsResponse(
  response: Event[] | Error,
  _status: status
): ActionTypes {
  return {
    type: actions.GET_EVENTS_RESPONSE,
    response,
    status: _status
  };
}
export function getFluidIntakeResponse(
  response: FluidIntake[] | Error,
  _status: status
): ActionTypes {
  return {
    type: actions.GET_FLUID_INTAKE_RESPONSE,
    response,
    status: _status
  };
}
export function getFoodIntakeResponse(
  response: FoodIntake[] | Error,
  _status: status
): ActionTypes {
  return {
    type: actions.GET_FOOD_INTAKE_RESPONSE,
    response,
    status: _status
  };
}
export function getMedicationResponse(
  response: Medication[] | Error,
  _status: status
): ActionTypes {
  return {
    type: actions.GET_MEDICATION_RESPONSE,
    response,
    status: _status
  };
}
export function getMoodsResponse(
  response: Mood[] | Error,
  _status: status
): ActionTypes {
  return {
    type: actions.GET_MOODS_RESPONSE,
    response,
    status: _status
  };
}
export function getObservationsResponse(
  response: Observation[] | Error,
  _status: status
): ActionTypes {
  return {
    type: actions.GET_OBSERVATIONS_RESPONSE,
    response,
    status: _status
  };
}
export function getPadConditionResponse(
  response: PadCondition[] | Error,
  _status: status
): ActionTypes {
  return {
    type: actions.GET_PAD_CONDITION_RESPONSE,
    response,
    status: _status
  };
}
export function getTasksResponse(
  response: Task[] | Error,
  _status: status
): ActionTypes {
  return {
    type: actions.GET_TASKS_RESPONSE,
    response,
    status: _status
  };
}
