export interface Event {
  event_type: string;
  timestamp: Date;
  caregiver_id: string;
  visit_id: string;
}

export interface FluidIntake extends Event {
  fluid: string;
  cosumed_volume_ml: number;
}

export interface FoodIntake extends Event {
  meal: string;
  note: number;
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

export enum actions {
  GET_EVENTS = 'GET_EVENTS',
  GET_FLUID_INTAKE = 'GET_FLUID_INTAKE',
  GET_FOOD_INTAKE = 'GET_FOOD_INTAKE',
  GET_OBSERVATIONS = 'GET_OBSERVATIONS',
  GET_PAD_CONDITION = 'GET_PAD_CONDITION',
  GET_MOODS = 'GET_MOODS',
  GET_MEDICATION = 'GET_MEDICATION',
  GET_TASKS = 'GET_TASKS'
}

export interface GetEvents {
  type: typeof actions.GET_EVENTS;
  // payload: Event[];
}

export interface GetFluidIntake {
  type: typeof actions.GET_FLUID_INTAKE;
  // payload: FluidIntake[];
}

export interface GetFoodIntake {
  type: typeof actions.GET_FOOD_INTAKE;
  // payload: FoodIntake[];
}

export interface GetObservations {
  type: typeof actions.GET_OBSERVATIONS;
  // payload: Observation[];
}

export interface GetPadCondition {
  type: typeof actions.GET_PAD_CONDITION;
  // payload: PadCondition[];
}

export interface GetMoods {
  type: typeof actions.GET_MOODS;
  // payload: Mood[];
}

export interface GetMedication {
  type: typeof actions.GET_MEDICATION;
  // payload: Medication[];
}

export interface GetTasks {
  type: typeof actions.GET_TASKS;
  // payload: Task[];
}

export type actionTypes =
GetEvents | GetFluidIntake | GetFoodIntake | GetMedication | GetMoods | GetObservations | GetPadCondition | GetTasks;