import {constants} from '../../src/app/shared/constants';


export const hw5_fullbeta_input = {
  user_mode: constants.USER_MODE.GUIDED,
  target_event: constants.TARGET_EVENT.WAVR,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
  ],
  type_one_error: 0.05,
  outcomes: ['SOAM1'],
  repeated_measures: [
    {dimension: 'BrainRegion', units: '', type: constants.REPEATED_MEASURE_TYPES[1], values: [0, 1]}
  ],
  cluster: null,
  predictors: [
    {name: 'Treatment', groups: ['Placebo', 'Chemotherapy']},
    {name: 'Genotype', groups: ['A', 'B', 'C', 'D']}
  ],
  smallest_group: 5,
  groups: [
    {group: '', table: [[1, 1, 1, 2], [1, 1, 1, 2]]}
  ],
  gaussian_covariate: null,
  hypothesis: 'Treatment x Genotype',
  definefullbeta: true,
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[3.12, 3.17],
        [3.12, 3.17],
        [3.12, 3.17],
        [3.12, 3.17],
        [ 2.1, 2.15],
        [ 2.3, 2.35],
        [ 2.5, 2.55],
        [ 2.7, 3.25]]
    }
  ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'SOAM1', st_dev: 0.3}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: [
    {stdevs: [1, 1]}
  ],
  parameters_repeated_measure_correlations: [
    {table: [
        [null, null],
        [0.53, null]
      ]}
  ],
  parameters_intra_class_correlation: null,
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: null,
  power_method: null,
  power_curve: null
};


export const hw5_fullbeta_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {test: 'Hotelling Lawley Trace', power: 0.970965864159}
  ],
  model: {
    essence_design_matrix: [[1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1]],
    repeated_rows_in_design_matrix: 5,
    hypothesis_beta: [
      [3.145],
      [3.145],
      [3.145],
      [3.145],
      [2.125],
      [2.325],
      [2.525],
      [2.975]
    ],
    c_matrix: [
      [1, -1, 0, 0, -1, 1, 0, 0],
      [1, 0, -1, 0, -1, 0, 1, 0],
      [1, 0, 0, -1, -1, 0, 0, 1]
    ],
    u_matrix: [
      [0.5, 0.5]
    ],
    sigma_star: [
      [0.06885]
    ],
    theta_zero: [
      [0],
      [0],
      [0]
    ],
    alpha: 0.05,
    total_n: 50,
    theta: [
      [-0.2, -0.6, -0.9]
    ],
    m: [
      [4, 2, 2],
      [2, 4, 2],
      [2, 2, 3]
    ],
    nu_e: 42,
    hypothesis_sum_square: [
      [1.4675]
    ],
    error_sum_square: [
      [2.8917]
    ]
  }
};
