import { combineReducers, Reducer } from 'redux';
import { actions, DataState } from '../types';
import { initialState } from './initialState';

export type RootState = Readonly<{
  readonly data: DataState
}>;

export const dataReducer: Reducer<DataState> = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_ID:
      return {
        ...state,
        id: action.id
      };
    case actions.GET_EVENTS_RESPONSE:
      return {
        ...state,
        events: {
          ...state.events,
          status: action.status,
          ...(action.status === 'failure' && {error: action.response}),
          ...(action.status === 'success' && {events: action.response})
        }
      };
    case actions.GET_FLUID_INTAKE_RESPONSE:
      return {
        ...state,
        fluid_intake: {
          ...state.fluid_intake,
          status: action.status,
          ...(action.status === 'failure' && { error: action.response }),
          ...(action.status === 'success' && { fluid_intake: action.response })
        }
      };
    case actions.GET_FOOD_INTAKE_RESPONSE:
      return {
        ...state,
        food_intake: {
          ...state.food_intake,
          status: action.status,
          ...(action.status === 'failure' && { error: action.response }),
          ...(action.status === 'success' && { food_intake: action.response })
        }
      };
    case actions.GET_MEDICATION_RESPONSE:
      return {
        ...state,
        medication: {
          ...state.medication,
          status: action.status,
          ...(action.status === 'failure' && { error: action.response }),
          ...(action.status === 'success' && { medication: action.response })
        }
      };
    case actions.GET_MOODS_RESPONSE:
      return {
        ...state,
        moods: {
          ...state.moods,
          status: action.status,
          ...(action.status === 'failure' && { error: action.response }),
          ...(action.status === 'success' && { moods: action.response })
        }
      };
    case actions.GET_OBSERVATIONS_RESPONSE:
      return {
        ...state,
        observations: {
          ...state.observations,
          status: action.status,
          ...(action.status === 'failure' && { error: action.response }),
          ...(action.status === 'success' && { observations: action.response })
        }
      };
    case actions.GET_PAD_CONDITION_RESPONSE:
      return {
        ...state,
        pad_condition: {
          ...state.pad_condition,
          status: action.status,
          ...(action.status === 'failure' && { error: action.response }),
          ...(action.status === 'success' && { pad_condition: action.response })
        }
      };
    case actions.GET_TASKS_RESPONSE:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          status: action.status,
          ...(action.status === 'failure' && { error: action.response }),
          ...(action.status === 'success' && { tasks: action.response })
        }
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers<RootState>({
  data: dataReducer
});