import {constants} from '../../src/app/shared/constants';

// A multilevel study with a hypothesis test of a between-independent sampling unit factor.

export const hw3_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
  ],
  type_one_error: 0.05,
  outcomes: ['Grade', 'LSK', 'CTOPP'],
  repeated_measures: null,
  cluster: {element: 'Student', levels: [{name: 'School', no_elements: 4}, {name: 'Classroom', no_elements: 5}]},
  predictors: [
    {name: 'LiteracyProgram', groups: ['ABRA', 'English', 'Bi-lingual']}
    ],
  smallest_group: 15,
  groups: [
    {group: '', table: [[1], [1], [1]]},
  ],
  gaussian_covariate: null,
  hypothesis: 'LiteracyProgram',
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[0.3], [0.1], [0.1]]},
    {means: [[0.3], [0.1], [0.1]]},
    {means: [[0.3], [0.1], [0.1]]}
  ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'Grade', st_dev: 4.4},
    {outcome: 'LSK', st_dev: 4.2},
    {outcome: 'CTOPP', st_dev: 0.6}
  ],
  parameters_outcome_correlation: [
        [null, null, null],
        [0.9, null, null],
        [0.2, 0.4, null]
  ],
  parameters_outcome_repeated_measure_stdev: null,
  parameters_repeated_measure_correlations: null,
  parameters_intra_class_correlation: [0.11, 0.04],
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: [1],
  power_method: null,
  power_curve: null
};


export const hw3_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {test: 'Hotelling Lawley Trace', power: 0.882844446942}
  ],
  model: {
    essence_design_matrix: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ],
    repeated_rows_in_design_matrix: 15,
    hypothesis_beta: [
      [0.3, 0.3, 0.3],
      [0.1, 0.1, 0.1],
      [0.1, 0.1, 0.1]
    ],
    c_matrix: [
      [-1, 1, 0],
      [-1, 0, 1]
    ],
    u_matrix: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ],
    sigma_star: [
      [1.4934304, 1.2829925, 0.0407299],
      [1.2829925, 1.3607496, 0.0777571],
      [0.0407299, 0.0777571, 0.0277704]
    ],
    theta_zero: [
      [ 0, 0, 0],
      [ 0, 0, 0]
    ],
    alpha: 0.05,
    total_n: 45,
    theta: [
      [-0.2, -0.2, -0.2],
      [-0.2, -0.2, -0.2]
    ],
    m: [
      [2, 1],
      [1, 2]
    ],
    nu_e: 42,
    hypothesis_sum_square: [
      [0.4, 0.4, 0.4],
      [0.4, 0.4, 0.4],
      [0.4, 0.4, 0.4]
    ],
    error_sum_square: [
      [62.724076800000,  53.885684160000,   1.710656640000],
      [53.885684160000,  57.151483200000,   3.265799040000],
      [ 1.710656640000,   3.265799040000,   1.166356800000]
    ]
  }
};
