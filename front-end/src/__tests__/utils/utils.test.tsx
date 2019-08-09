import { expect as _expect } from 'chai';

import * as utils from '@App/utils/index';

/* Normally part of src/setupTests.js but ... */
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
/* ... file was not being picked up by CRA so added manually */

/* tslint:disable:no-unused-expression */
/* tslint:disable:no-console */
/* tslint:disable:max-line-length */

const testArray1 = [{
  id: 'test1', timestamp: '2019-05-23T11:35:52.665Z'
}, {
  id: 'test2', timestamp: '2019-04-23T11:35:52.665Z'
}];

describe('generateSortedArray', () => {
  it('should sort an array by timestamp', () => {
    const newArray = utils.generateSortedArray(testArray1);
    _expect(newArray[0].id).to.equal('test2');
  });
  it('should add a new day field', () => {
    const newArray = utils.generateSortedArray(testArray1);
    _expect(newArray[0].day).to.exist;
    _expect(newArray[0].day).to.equal('04-23');
  });
});

describe('addWeeksToArray', () => {
  it('should add a new week field equal to the week of the year', () => {
    const sortedArray = utils.generateSortedArray(testArray1);
    const newArray = utils.addWeeksToArray(sortedArray);
    _expect(newArray[0].week).to.equal(17);
  });
});

const testArray2 = [{id: 'test', value: 1}, {id: 'test', value: 2}];

describe('getUniqueValues', () => {
  it('should remove duplicate values of selected property', () => {
    const newArray = utils.getUniqueValues(testArray2, 'id');
    _expect(newArray).to.have.lengthOf(1);
  });
  it('should not de-dupe array if selected property is different', () => {
    const newArray = utils.getUniqueValues(testArray2, 'value');
    _expect(newArray).to.have.lengthOf(2);
  });
});

// create shared dummy array with all properties to be able to test all functions
const testArray3 = [
  { day: '04-23', fluid: 'regular', consumed_volume_ml: 200, meal: 'meal', note: 'note1', visit_id: 'visit1', caregiver_id: 'caregiverA', task_definition_description: 'Ensure home is secure', mood: 'okay', pad_condition: 'wet', event_type: 'regular_medication_taken', timestamp: new Date('2019-05-23T11:35:52.665Z'), care_recipient_id: '', id: 'a', task_schedule_note: 'A', medication_failure_reason: '', medication_taken: true},

  { day: '04-25', fluid: 'caffeinated', consumed_volume_ml: 300, meal: 'meal', note: 'note2', visit_id: 'visit2', caregiver_id: 'caregiverA', task_definition_description: 'Assist into bed', mood: 'sad', pad_condition: 'dry', event_type: 'general_observation', timestamp: new Date('2019-05-23T11:35:52.665Z'), care_recipient_id: '', id: 'b', task_schedule_note: 'B', medication_failure_reason: '', medication_taken: false},

  { day: '04-25', fluid: 'regular', consumed_volume_ml: 100, meal: 'snack', note: 'note3', visit_id: 'visit3', caregiver_id: 'caregiverB', task_definition_description: 'Assist into bed', mood: 'happy', pad_condition: 'wet', event_type: 'regular_medication_taken', timestamp: new Date('2019-05-23T11:35:52.665Z'), care_recipient_id: '', id: 'c', task_schedule_note: 'C', medication_failure_reason: '', medication_taken: false}
];

describe('getFluidDataByDay', () => {
  const newArray = utils.getFluidDataByDay(testArray3);
  it('should aggregate last two events into 1 for total fluid intake of 400ml', () => {
    _expect(newArray[1].total).to.equal(400);
  });
  it('should keep caffeinated and regular separate', () => {
    _expect(newArray[1].caffeinated).to.equal(300);
  });
});

describe('getFoodDataByDay', () => {
  const newArray = utils.getFoodDataByDay(testArray3);
  it('should count 1 meal and 1 snack in last day', () => {
    _expect(newArray[0].snacks).to.equal(0);
    _expect(newArray[1].meals).to.equal(1);
    _expect(newArray[1].snacks).to.equal(1);
  });
  it('should include both notes split into meal and snack in an array', () => {
    _expect(newArray[1].notes).to.deep.equal([
      'MEALS:', 'note2', 'SNACKS:', 'note3'
    ]);
  });
});

describe('getVisitsDataByDay', () => {
  it('should count 2 visits on last day', () => {
    const newArray = utils.getVisitsDataByDay(testArray3);
    _expect(newArray[1].visits).to.equal(2);
  });
  it('should count 1 visit on last day AFTER tweaking', () => {
    testArray3[2].visit_id = 'visit2';
    const newArray = utils.getVisitsDataByDay(testArray3);
    _expect(newArray[1].visits).to.equal(1);
  });
  it('should record only the general observation note taken - note2', () => {
    const newArray = utils.getVisitsDataByDay(testArray3);
    _expect(newArray[1].notes).to.deep.equal([
      'note2'
    ]);
  });
});

describe('getCarerData', () => {
  it('should count 2 visits by A and 1 visit by B', () => {
    const newArray = utils.getCarerData(testArray3);
    const testArray = [{ carer: 'caregiverA', visits: 2 }, { carer: 'caregiverB', visits: 1 }];
    _expect(newArray).to.deep.equal(testArray);
  });
});

describe('getTaskData', () => {
  it('should give B a count of 2 and A a count of 1', () => {
    const newArray = utils.getTaskData(testArray3);
    const testArray = [{ task: 'Check secure', count: 1, notes: ['A'] }, { task: 'Bed assistance', count: 2, notes: ['B', 'C'] }];
    _expect(newArray).to.deep.equal(testArray);
  });
});

describe('getMoodDataByWeek', () => {
  it('should give a mood score of 50', () => {
    const newArray = utils.getMoodDataByWeek(testArray3);
    _expect(newArray[0].moodScore).to.equal(50);
  });
});

describe('getMedicationDataByWeek', () => {
  it('should record 1 miss after modification', () => {
    testArray3[1].event_type = 'regular_medication_not_taken';
    const newArray = utils.getMedicationDataByWeek(testArray3);
    _expect(newArray[0].missed).to.equal(1);
  });
});

describe('getPadDataByWeek', () => {
  it('should record 2 wet and 0 soiled', () => {
    const newArray = utils.getPadDataByWeek(testArray3);
    _expect(newArray[0].wet).to.equal(2);
    _expect(newArray[0].soiled).to.equal(0);
  });
});
