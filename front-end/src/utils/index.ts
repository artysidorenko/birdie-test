import * as _ from 'lodash';
import { FluidIntake, FoodIntake } from '@App/store/types';

/**
 * Main purpose of these functions is to transform the raw array of events from backend db
 * into sorted array of per day (collapsing timestamps into days)
 * so as to provide aggregate information for quantitative variables
 */

/* tslint:disable-next-line:no-any */
function generateSortedArray (dataArray: Array<any>): Array<any> {
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
function getUniqueDates (dataArray: Array<any>): string[] {
  return Array.from(
    new Set(dataArray.map(event => event.day))
  );
}

export function getFluidDataByDay(data: FluidIntake[]) {

  const parsedData = generateSortedArray(data);
  const uniqueDates = getUniqueDates(parsedData);

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
  const uniqueDates = getUniqueDates(parsedData);

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