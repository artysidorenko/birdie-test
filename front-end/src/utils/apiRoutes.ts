const apiRoutes = {
  host: '',
  endpoints : {
    getEvents: 'api/events',
    getFluidIntake: 'api/events/fluid_intake_observation',
    getFoodIntake: 'api/events/food_intake_observation',
    getMedication: {
      taken: 'api/events/regular_medication_taken',
      not_taken: 'api/events/regular_medication_not_taken'
    },
    getObservations: {
      general: 'api/events/general_observation',
      physical: 'api/events/physical_health_observation',
      mental: 'api/events/mental_health_observation'
    },
    getPadCondition: 'api/events/incontinence_pad_observation',
    getMoods: 'api/events/mood_observation',
    getTasks: {
      completed: 'api/events/task_completed',
      reverted: 'task_completion_reverted'
    }
  },
  query_prefix: '?id=',
  care_recipient_id: ['df50cac5-293c-490d-a06c-ee26796f850d', 'ad3512a6-91b1-4d7d-a005-6f8764dd0111']
};

if (process.env.NODE_ENV === 'development') {
  apiRoutes.host = 'http://localhost:8000/';
} else {
  apiRoutes.host = 'https://birdie-server-asidorenko.herokuapp.com/';
}

export default apiRoutes;