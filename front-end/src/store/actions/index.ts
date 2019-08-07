import { ActionTypes, actions } from '../types';

export function getEvents(): ActionTypes {
  return {
    type: actions.GET_EVENTS
  };
}
export function getFluidIntake(): ActionTypes {
  return {
    type: actions.GET_FLUID_INTAKE
  };
}
export function getFoodIntake(): ActionTypes {
  return {
    type: actions.GET_FOOD_INTAKE
  };
}
export function getMedication(): ActionTypes {
  return {
    type: actions.GET_MEDICATION
  };
}
export function getMoods(): ActionTypes {
  return {
    type: actions.GET_MOODS
  };
}
export function getObservations(): ActionTypes {
  return {
    type: actions.GET_OBSERVATIONS
  };
}
export function getPadCondition(): ActionTypes {
  return {
    type: actions.GET_PAD_CONDITION
  };
}
export function getTasks(): ActionTypes {
  return {
    type: actions.GET_TASKS
  };
}