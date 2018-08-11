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
      predictors: [
        {name: 'gender', groups: ['m', 'f']},
        {name: 'colour', groups: ['red', 'green', 'blue']},
        {name: 'c', groups: ['red', 'green', 'blue']}],
      smallest_group: 10,
      groups: [
        {group: '', table: [[2, 3, 4], [5, 6, 7]]},
        {group: '', table: [[2, 3, 4], [5, 6, 9]]},
        {group: '', table: [[2, 3, 4], [5, 7, 9]]}
        ],
      gaussian_covariate: 3,
      hypothesis: 'gender x colour',
      hypothesis_between: null,
      hypothesis_within: null,
      theta0: null,
      marginal_means: [
        {means: [[1], [2], [3], [4], [5], [6]]},
        {means: [[1], [2], [3], [4], [5], [6]]},
        {means: [[1], [2], [3], [4], [5], [6]]},
        {means: [[4], [5], [6], [7], [8], [9]]}
        ],
      parameters_scale_factor: 2,
      parameters_standard_deviation: [
        {outcome: 'a', st_dev: 1},
        {outcome: 'b', st_dev: 2},
        {outcome: 'c', st_dev: 3},
        {outcome: 'd', st_dev: 4}
        ],
      parameters_outcome_correlation: [
        [null, null, null, null],
        [0.07, null, null, null],
        [0, 0, null, null],
        [0, 0, 0, null]
      ],
      parameters_outcome_repeated_measure_stdev: [
        {stdevs: [1, 2, 3]},
        {stdevs: [1, 2]},
        {stdevs: [1, 2, 3]},
        {stdevs: [1, 2]},
        {stdevs: [1, 2, 3]},
        {stdevs: [1, 2]},
        {stdevs: [1, 2, 3]},
        {stdevs: [1, 2]}
      ],
      parameters_repeated_measure_correlations: [
        {table: [
        [null, null, null],
        [0.07, null, null],
        [0, 0, null]
      ]},
        {table: [
        [null, null],
        [0.5, null]
      ]},
      ],
      parameters_intra_class_correlation: [2, 3],
      parameters_gaussian_covariate_variance: 2,
      parameters_gaussian_covariate_correlation: [1, 2, 3, 4],
      parameters_scale_factor_variance: [1, 2, 3, 4],
      power_curve: null
    }
    page.fromJSON(input);
  });
});
