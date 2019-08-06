import { actionTypes, actions } from '../types';

export function GetEvents(): actionTypes {
  return {
    type: actions.GET_EVENTS
  };
}
export function GetFluidIntake(): actionTypes {
  return {
    type: actions.GET_FLUID_INTAKE
  };
}
export function GetFoodIntake(): actionTypes {
  return {
    type: actions.GET_FOOD_INTAKE
  };
}
export function GetMedication(): actionTypes {
  return {
    type: actions.GET_MEDICATION
  };
}
export function GetMoods(): actionTypes {
  return {
    type: actions.GET_MOODS
  };
}
export function GetObservations(): actionTypes {
  return {
    type: actions.GET_OBSERVATIONS
  };
}
export function GetPadCondition(): actionTypes {
  return {
    type: actions.GET_PAD_CONDITION
  };
}
export function GetTasks(): actionTypes {
  return {
    type: actions.GET_TASKS
  };
};