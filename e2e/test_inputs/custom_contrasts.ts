import {constants} from '../../src/app/shared/model/constants';


export const cc_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
  ],
  type_one_error: [0.05],
  outcomes: ['outcome1'],
  repeated_measures: [
    {dimension: 'repMeas1', units: 'months', type: constants.REPEATED_MEASURE_TYPES[0], values: [0, 1, 2]},
  ],
  cluster: null,
  predictors: [
    {name: 'group1', groups: ['0', '1']}
  ],
  smallest_group: [5],
  groups: [
    {group: '', table: [[1], [1]]}
  ],
  gaussian_covariate: null,
  hypothesis: 'group1 x repMeas1',
  marginal_hypothesis: true,
  hypothesis_between: {
    nature: 'custom',
    rows: 1,
    matrix: [[1, -1]]
  },
  hypothesis_within: {
    nature: 'custom',
    cols: 3,
    matrix: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]
  },
  theta0: null,
  marginal_means: [
    {means: [[3.6, 2.8, 0.9],
             [4.5, 4.3, 3.0]]
    }
  ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'outcome1', st_dev: 0.9}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: [
    {stdevs: [1, 1, 1]}
  ],
  parameters_repeated_measure_correlations: [
    {table: [
        [null, null, null],
        [0.5, null, null],
        [0.4, 0.5, null]
      ]}
  ],
  parameters_intra_class_correlation: [1],
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: [1],
  power_method: null,
  power_curve: null
};


export const cc_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {test: 'Hotelling Lawley Trace', power: 0.628622450905}
  ],
  model: {
    essence_design_matrix: [
      [1, 0],
      [0, 1]
    ],
    repeated_rows_in_design_matrix: 15,
    hypothesis_beta: [
        [3.6, 2.8, 0.9],
        [4.5, 4.3, 3.0]
    ],
    c_matrix: [
      [ 1, -1]
    ],
    u_matrix: [
      [ 1, 0, 0],
      [ 0, 1, 0],
      [ 0, 0, 1]
    ],
    sigma_star: [
      [ 0.81, 0.405, 0.342],
      [ 0.405, 0.81, 0.405],
      [ 0.342, 0.405, 0.81]
    ],
    theta_zero: [
      [ 0, 0, 0]
    ],
    alpha: 0.05,
    total_n: 10,
    theta: [
      [-0.9, -1.5, -2.1]
    ],
    hypothesis_sum_square: [
      [ 2.025,  3.375, 4.725],
      [ 3.375,  5.625, 7.875],
      [ 4.725,  7.875, 11.025]
    ],
    error_sum_square: [
      [ 6.480, 3.240, 2.592],
      [ 3.240, 6.480, 3.240],
      [ 2.592, 3.240, 6.480]
    ]
  }
};
