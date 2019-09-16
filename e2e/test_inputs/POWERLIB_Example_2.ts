import {constants} from '../../src/app/shared/model/constants';

// POWERLIB Example 2, a paired t-test

export const example2_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
  ],
  type_one_error: [0.05],
  outcomes: ['Outcome'],
  repeated_measures: [
    {dimension: 'repm', units: 'dkn', type: constants.REPEATED_MEASURE_TYPES[0], values: [0, 1]},
  ],
  cluster: null,
  predictors: null,
  smallest_group: 10,
  groups: [
    {group: '', table: [[1]]},
  ],
  gaussian_covariate: null,
  hypothesis: 'repm',
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[0, 1]]}
  ],
  parameters_scale_factor: [0.5, 1, 1.5, 2, 2.5],
  parameters_standard_deviation: [
    {outcome: 'Outcome', st_dev: 1.414214}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: null,
  parameters_repeated_measure_correlations: [
    {
      table: [
        [null, null],
        [0.5, null]
      ]
    }
  ],
  parameters_intra_class_correlation: null,
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: [1],
  power_method: null,
  power_curve: null
};


export const example2_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor:   0, total_N: 10, power:  0.05},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 10, power: 0.171},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor:   1, total_N: 10, power: 0.514},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1.5, total_N: 10, power: 0.846},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor:   2, total_N: 10, power: 0.977},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 2.5, total_N: 10, power: 0.999}
  ]
};
