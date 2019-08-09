// #1 INDIVIDUAL DATAPOINT INTERFACES

export interface Event {
  id: string;
  event_type: string;
  timestamp: Date;
  caregiver_id: string;
  visit_id: string;
  care_recipient_id: string;
  note: string;
}

export interface FluidIntake extends Event {
  fluid: string;
  consumed_volume_ml: number;
}

export interface FoodIntake extends Event {
  meal: string;
  note: string;
}

// includes general, mental health & physical observations
export interface Observation extends Event {
  note: string;
}

export interface PadCondition extends Event {
  pad_condition: string;
}

export interface Mood extends Event {
  mood: string;
}

export interface Medication extends Event {
  medication_taken: boolean;
  medication_failure_reason: string | undefined | null;
}

export interface Task extends Event {
  task_definition_description: string;
  task_schedule_note: string;
}

// #2 ACTION TYPES AND INTERFACES

// #2 ACTION TYPES AND INTERFACES
export enum actions {
  GET_EVENTS = 'GET_EVENTS',
  GET_FLUID_INTAKE = 'GET_FLUID_INTAKE',
  GET_FOOD_INTAKE = 'GET_FOOD_INTAKE',
  GET_OBSERVATIONS = 'GET_OBSERVATIONS',
  GET_PAD_CONDITION = 'GET_PAD_CONDITION',
  GET_MOODS = 'GET_MOODS',
  GET_MEDICATION = 'GET_MEDICATION',
  GET_TASKS = 'GET_TASKS',
  GET_EVENTS_RESPONSE = 'GET_EVENTS_RESPONSE ',
  GET_FLUID_INTAKE_RESPONSE = 'GET_FLUID_INTAKE_RESPONSE ',
  GET_FOOD_INTAKE_RESPONSE = 'GET_FOOD_INTAKE_RESPONSE ',
  GET_OBSERVATIONS_RESPONSE = 'GET_OBSERVATIONS_RESPONSE ',
  GET_PAD_CONDITION_RESPONSE = 'GET_PAD_CONDITION_RESPONSE ',
  GET_MOODS_RESPONSE = 'GET_MOODS_RESPONSE ',
  GET_MEDICATION_RESPONSE = 'GET_MEDICATION_RESPONSE ',
  GET_TASKS_RESPONSE = 'GET_TASKS_RESPONSE',
  SET_ID = 'SET_ID'
}

export enum status {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILURE = 'failure'
}

export interface SetID {
  type: typeof actions.SET_ID;
  id: string;
}

export interface GetEvents {
  type: typeof actions.GET_EVENTS;
  id: string;
}
export interface GetEventsResponse {
  type: typeof actions.GET_EVENTS_RESPONSE;
  status: status;
  response: Event[] | Error;
}

export interface GetFluidIntake {
  type: typeof actions.GET_FLUID_INTAKE;
  id: string;
}
export interface GetFluidIntakeResponse {
  type: typeof actions.GET_FLUID_INTAKE_RESPONSE;
  status: status;
  response: FluidIntake[] | Error;
}

export interface GetFoodIntake {
  type: typeof actions.GET_FOOD_INTAKE;
  id: string;
}
export interface GetFoodIntakeResponse {
  type: typeof actions.GET_FOOD_INTAKE_RESPONSE;
  status: status;
  response: FoodIntake[] | Error;
}

export interface GetObservations {
  type: typeof actions.GET_OBSERVATIONS;
  id: string;
}
export interface GetObservationsResponse {
  type: typeof actions.GET_OBSERVATIONS_RESPONSE;
  status: status;
  response: Observation[] | Error;
}

export interface GetPadCondition {
  type: typeof actions.GET_PAD_CONDITION;
  id: string;
}
export interface GetPadConditionResponse {
  type: typeof actions.GET_PAD_CONDITION_RESPONSE;
  status: status;
  response: PadCondition[] | Error;
}

export interface GetMoods {
  type: typeof actions.GET_MOODS;
  id: string;
}
export interface GetMoodsResponse {
  type: typeof actions.GET_MOODS_RESPONSE;
  status: status;
  response: Mood[] | Error;
}

export interface GetMedication {
  type: typeof actions.GET_MEDICATION;
  id: string;
}
export interface GetMedicationResponse {
  type: typeof actions.GET_MEDICATION_RESPONSE;
  status: status;
  response: Medication[] | Error;
}

export interface GetTasks {
  type: typeof actions.GET_TASKS;
  id: string;
}
export interface GetTasksResponse {
  type: typeof actions.GET_TASKS_RESPONSE;
  status: status;
  response: Task[] | Error;
}

export type ActionTypes =
  | SetID
  | GetEvents
  | GetFluidIntake
  | GetFoodIntake
  | GetMedication
  | GetMoods
  | GetObservations
  | GetPadCondition
  | GetTasks
  | GetEventsResponse
  | GetFluidIntakeResponse
  | GetFoodIntakeResponse
  | GetMedicationResponse
  | GetMoodsResponse
  | GetObservationsResponse
  | GetPadConditionResponse
  | GetTasksResponse;

// #3 STATE TYPES

export type LoadingState = {
  readonly status: status | null | undefined;
  readonly error: string | null | undefined;
};

export type EventsState = LoadingState & {
  readonly events: Event[];
};
export type FluidState = LoadingState & {
  readonly fluid_intake: FluidIntake[];
};
export type FoodState = LoadingState & {
  readonly food_intake: FoodIntake[];
};
export type ObservationState = LoadingState & {
  readonly observations: Observation[];
};
export type PadState = LoadingState & {
  readonly pad_condition: PadCondition[];
};
export type MoodState = LoadingState & {
  readonly moods: Mood[];
};
export type MedicationState = LoadingState & {
  readonly medication: Medication[];
};
export type TaskState = LoadingState & {
  readonly tasks: Task[];
};

export type DataState = {
  readonly id: string,
  readonly events: EventsState;
  readonly fluid_intake: FluidState;
  readonly food_intake: FoodState;
  readonly observations: ObservationState;
  readonly pad_condition: PadState;
  readonly moods: MoodState;
  readonly medication: MedicationState;
  readonly tasks: TaskState;
};