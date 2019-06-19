import {constants} from '../../src/app/shared/constants';

// A multilevel study with a hypothesis test of a between-independent sampling unit factor.

export const Gaussian_unconditional_50_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
  ],
  type_one_error: [0.05],
  outcomes: ['O1', 'O2', 'O3', 'O4'],
  repeated_measures: null,
  cluster: null,
  predictors: [
    {name: 'group', groups: ['g1', 'g2', 'g3']}
  ],
  smallest_group: 50,
  groups: [
    {group: '', table: [[1], [1], [1]]},
  ],
  gaussian_covariate: true,
  hypothesis: 'group',
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[1], [0], [0]]},
    {means: [[0], [2], [0]]},
    {means: [[0], [0], [0]]},
    {means: [[0], [0], [0]]}
  ],
  parameters_scale_factor: [0.1141548, 0.1812892, 0.2423835],
  parameters_standard_deviation: [
    {outcome: 'O1', st_dev: 1},
    {outcome: 'O2', st_dev: 1},
    {outcome: 'O3', st_dev: 1},
    {outcome: 'O4', st_dev: 1}
  ],
  parameters_outcome_correlation: [
    [null, null, null, null],
    [   0, null, null, null],
    [   0,    0, null, null],
    [   0,    0,    0, null]
  ],
  parameters_outcome_repeated_measure_stdev: null,
  parameters_repeated_measure_correlations: null,
  parameters_intra_class_correlation: null,
  parameters_gaussian_covariate_variance: 1,
  parameters_gaussian_covariate_correlation: [0.5, 0.5, 0.5, 0],
  gaussian_covariate_method: {unconditonpower: true, quantilepower: false, quantiles: null},
  parameters_scale_factor_variance: null,
  power_method: null,
  power_curve: null
};


export const Gaussian_unconditional_50_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {test: 'Hotelling Lawley Trace', power: 0.201},
    {test: 'Hotelling Lawley Trace', power: 0.502},
    {test: 'Hotelling Lawley Trace', power: 0.802}
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
