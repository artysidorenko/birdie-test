import * as _ from 'lodash';
import * as moment from 'moment';
import { FluidIntake, FoodIntake, Event, Mood, Medication, PadCondition, Task } from '@App/store/types';

/**
 * Main purpose of these functions is to transform the raw array of events from backend db
 * into sorted array of per day (collapsing timestamps into days)
 * so as to provide aggregate information for quantitative variables
 */

/* tslint:disable-next-line:no-any */
export function generateSortedArray (dataArray: Array<any>): Array<any> {
  return dataArray.map(event => {
      const day = event.timestamp.toString().substr(5, 5);
      return { day, ...event };
    })
    .sort((e1, e2) => {
      const date1 = new Date(e1.timestamp);
      const date2 = new Date(e2.timestamp);
      return date1.getTime() - date2.getTime();
    });
}

/* tslint:disable-next-line:no-any */
export function addWeeksToArray (sortedArray: Array<any>): Array<any> {
  return sortedArray.map(event => {
    const date = moment(event.timestamp);
    const week = date.week();
    return { week, ...event};
  });
}

/* tslint:disable-next-line:no-any */
export function getUniqueValues (dataArray: Array<any>, property: string): string[] {
  return Array.from(
    new Set(dataArray.map(event => event[property]))
  );
}

export function getFluidDataByDay(data: FluidIntake[]) {

  const parsedData = generateSortedArray(data);
  const uniqueDates = getUniqueValues(parsedData, 'day');

  return uniqueDates.map(date => {

    const today = parsedData.filter(e => e.day === date);
    const todayReg = today.filter(e => e.fluid === 'regular');
    const todayCaf = today.filter(e => e.fluid === 'caffeinated');

    const total = _.sum(today.map(e => e.consumed_volume_ml));
    const regular = _.sum(todayReg.map(e => e.consumed_volume_ml));
    const caffeinated = _.sum(todayCaf.map(e => e.consumed_volume_ml));

    return {
      day: date,
      total,
      regular,
      caffeinated
    };
  });
}

export function getFoodDataByDay(data: FoodIntake[]) {

  const parsedData = generateSortedArray(data);
  const uniqueDates = getUniqueValues(parsedData, 'day');

  return uniqueDates.map(date => {

    const today = parsedData.filter(e => e.day === date);
    const todayMeal = today.filter(e => e.meal === 'meal');
    const todaySnack = today.filter(e => e.meal === 'snack');

    return {
      day: date,
      meals: todayMeal.length,
      snacks: todaySnack.length,
      notes: [
        'MEALS:',
        ...todayMeal.map(e => e.note),
        'SNACKS:',
        ...todaySnack.map(e => e.note)
      ]
    };
  });
}

export function getVisitsDataByDay (data: Event[]) {

  const parsedData = generateSortedArray(data);
  const uniqueDates = getUniqueValues(parsedData, 'day');
  return uniqueDates.map(date => {

    const today = parsedData.filter(e => e.day === date);
    const uniqueVisits = new Set(today.map(e => e.visit_id));
    // get notes data if the event is a qualitative observation
    const notes = today
      .filter(e => {
        const type = e.event_type;
        const lookup = ['general_observation', 'mental_health_observation', 'physical_health_observation'];
        return lookup.some(t => type === t) && !!e.note;
      })
      .map(e => e.note)
      // clean out some redundant notes
      .filter(note => !note.includes('Nothing unusual to report') && !note.includes('No changes'));
    
    return {
      day: date,
      visits: uniqueVisits.size,
      notes
    };
  });
}

export function getCarerData (data: Event[]) {

  const uniqueCarers = getUniqueValues(data, 'caregiver_id');

  return uniqueCarers.map(carer => {

    const carerEvents = data.filter(e => e.caregiver_id === carer);
    const visitIDs = new Set(carerEvents.map(e => e.visit_id));

    return {
      carer,
      visits: visitIDs.size
    };
  });
}

export function getTaskData(data: Task[]) {
  const taskTypes = getUniqueValues(data, 'task_definition_description');

  return taskTypes.map(task => {
    const taskEvents = data.filter(e => e.task_definition_description === task);
    const notes = taskEvents.map(e => e.task_schedule_note);

    return {
      task,
      count: taskEvents.length,
      notes
    };
  });
}

export function getMoodDataByWeek (data: Mood[]) {

  const parsedData = addWeeksToArray(generateSortedArray(data));

  const uniqueWeeks = getUniqueValues(parsedData, 'week');

  return uniqueWeeks.map(week => {

    const thisWeek = parsedData.filter(e => e.week === week);
    const happyCount = thisWeek.filter(e => e.mood === 'happy').length;
    const okayCount = thisWeek.filter(e => e.mood === 'okay').length;
    const sadCount = thisWeek.filter(e => e.mood === 'sad').length;
    const total = happyCount + okayCount + sadCount;
    // assume happy = 100, okay = 50, and sad = 0
    const moodScore = 100 * ( happyCount + (0.5 * okayCount) ) / total;
    const notes = thisWeek
      .filter(e => !!e.note)
      .map(e => `${e.day} - ${e.note}`);

    return {
      week,
      moodScore,
      notes,
      observations: total
    };
  });
}

export function getMedicationDataByWeek(data: Medication[]) {
  const parsedData = addWeeksToArray(generateSortedArray(data));

  const uniqueWeeks = getUniqueValues(parsedData, 'week');

  return uniqueWeeks.map(week => {
    const thisWeek = parsedData.filter(e => e.week === week);
    const taken = thisWeek.filter(e => e.event_type === 'regular_medication_taken').length;
    const missed = thisWeek.filter(
      e => e.event_type === 'regular_medication_not_taken'
    ).length;
    const total = taken + missed;
    
    const medMissedPercent = 100 * missed / total;
    
    return {
      week,
      missed,
      medMissedPercent
    };
  });
}

export function getPadDataByWeek(data: PadCondition[]) {
  const parsedData = addWeeksToArray(generateSortedArray(data));

  const uniqueWeeks = getUniqueValues(parsedData, 'week');

  return uniqueWeeks.map(week => {
    const thisWeek = parsedData.filter(e => e.week === week);
    const soiled = thisWeek.filter(e => e.pad_condition === 'soiled').length;
    const wet = thisWeek.filter(e => e.pad_condition === 'wet').length;
    
    return {
      week,
      soiled,
      wet
    };
  });
}