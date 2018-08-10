import {StudyFormComponentPage} from '../src/app/study-form/study-form.po';
import {constants} from '../src/app/shared/constants';

describe('demo-front-app short course homework test', () => {
  let page: StudyFormComponentPage;

  beforeEach(() => {
    page = new StudyFormComponentPage();
    page.navigateTo('/design/MODE');
  });

  it('Create a test case for Homework 1 from the short course', () => {
    // MODE
    const input = {
      user_mode: constants.USER_MODE.GUIDED,
      target_event: constants.TARGET_EVENT.WAVR,
      solve_for: {solve_for: constants.SOLVE_FOR.SAMPLE_SIZE, power: 0.9, ci_width: 0.1},
      statistical_tests: [
        constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
        constants.STATISTICAL_TESTS.PILLAI_BARTLET,
        constants.STATISTICAL_TESTS.WILKS_LIKLIEHOOD,
        constants.STATISTICAL_TESTS.BOX_CORRECTION,
        constants.STATISTICAL_TESTS.GEISSER_GREENHOUSE,
        constants.STATISTICAL_TESTS.HUYNH_FELDT,
        constants.STATISTICAL_TESTS.UNCORRECTED,
        constants.STATISTICAL_TESTS.UNIREP,
        constants.STATISTICAL_TESTS.MULTIREP
      ],
      type_one_error: 0.06,
      outcomes: ['a', 'b', 'c', 'd'],
      repeated_measures: [
        {dimension: 'Time', units: 'days', type: constants.REPEATED_MEASURE_TYPES[0], values: [1, 7, 15]},
        {dimension: 'Arm', type: constants.REPEATED_MEASURE_TYPES[1], values: [1, 3]}
        ],
      cluster: {element: 'Class', levels: [{name: 'level1', no_elements: 10}, {name: 'level2', no_elements: 20}]},
      predictors: [{name: 'gender', groups: ['m', 'f']}, {name: 'colour', groups: ['red', 'green', 'blue']}]
    }
    page.fromJSON(input);
  });
});
