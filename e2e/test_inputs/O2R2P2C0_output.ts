import {constants} from '../../src/app/shared/constants';

export const O2R2P2C0_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {test: 'Hotelling Lawley Trace', power: 0.925},
    {test: 'Pillai-Bartlett Trace', power: 0.757},
    {test: 'Wilks Likelihood Ratio', power: 0.909},
    {test: 'Repeated Measures: Geisser-Greenhouse Correction', power: 0.169}
    ],
  model: {
    essence_design_matrix: [
      [1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1]
    ],
    repeated_rows_in_design_matrix: 5,
    hypothesis_beta: [
      [60, 61, 100, 110,  80,  83, 55, 58, 1.5, 1.6, 2.5, 2.6, 2  , 1.9, 1.8, 1.8],
      [70, 65, 110, 125,  88,  90, 70, 70, 1.3, 1.3, 2.3, 2.5, 1.8, 2  , 1.7, 1.9],
      [65, 61, 100, 115,  85,  86, 65, 64, 1.4, 1.3, 2.3, 2.4, 1.8, 1.8, 1.7, 1.6],
      [70, 72, 110, 112,  98, 100, 75, 76, 0.9, 1  , 1.8, 1.9, 1.3, 1.3, 1.2, 1.1],
      [75, 76, 130, 127, 110, 112, 80, 79, 0.6, 0.8, 1.8, 1.8, 1.3, 1.4, 1.3, 1.2],
      [71, 68, 120, 122, 100, 100, 80, 81, 0.7, 0.7, 1.8, 1.7, 1.3, 1.2, 1.2, 1.1]
    ],
    c_matrix: [
      [ 1, -1,  0, -1,  1,  0],
      [ 1,  0, -1, -1,  0,  1]
    ],
    u_matrix: [
      [ 1, 1, 1, 0, 0, 0],
      [-1,-1,-1, 0, 0, 0],
      [-1, 0, 0, 0, 0, 0],
      [ 1, 0, 0, 0, 0, 0],
      [ 0,-1, 0, 0, 0, 0],
      [ 0, 1, 0, 0, 0, 0],
      [ 0, 0,-1, 0, 0, 0],
      [ 0, 0, 1, 0, 0, 0],
      [ 0, 0, 0, 1, 1, 1],
      [ 0, 0, 0,-1,-1,-1],
      [ 0, 0, 0,-1, 0, 0],
      [ 0, 0, 0, 1, 0, 0],
      [ 0, 0, 0, 0,-1, 0],
      [ 0, 0, 0, 0, 1, 0],
      [ 0, 0, 0, 0, 0,-1],
      [ 0, 0, 0, 0, 0, 1]
    ],
    sigma_star: [
      [       40, 54.205328, 39.580272,       0.2, 0.2710266, 0.1979014],
      [54.205328, 108.41066, 107.99093, 0.2710266, 0.5420533, 0.5399546],
      [39.580272, 107.99093,  147.5712, 0.1979014, 0.5399546,  0.737856],
      [      0.2, 0.2710266, 0.1979014,       0.1, 0.1355133, 0.0989507],
      [0.2710266, 0.5420533, 0.5399546, 0.1355133, 0.2710266, 0.2699773],
      [0.1979014, 0.5399546,  0.737856, 0.0989507, 0.2699773,  0.368928]
    ],
    theta_zero: [
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ]
    ],
    alpha: 0.05,
    total_n: 30,
    theta: [
      [-15,-4,-4,-0.4,-0.4,      -0.4],
      [ -5, 0, 4,-0.3,-0.3, -1.11e-16]
    ],
    m: [
      [ 4, 2 ],
      [ 2, 4 ]
    ],
    nu_e: 24,
    hypothesis_sum_square: [
      [291.66667, 83.333333, 100, 7.0833333, 7.0833333, 8.3333333],
      [83.333333, 26.666667,  40, 1.6666667, 1.6666667, 2.6666667],
      [      100,        40,  80,         1,         1,         4],
      [7.0833333, 1.6666667,   1, 0.2166667, 0.2166667, 0.1666667],
      [7.0833333, 1.6666667,   1, 0.2166667, 0.2166667, 0.1666667],
      [8.3333333, 2.6666667,   4, 0.1666667, 0.1666667, 0.2666667]
      ],
    error_sum_square: [
      [      960, 1300.9279, 949.92653,       4.8, 6.5046393, 4.7496327],
      [1300.9279, 2601.8557, 2591.7823, 6.5046393, 13.009279, 12.958911],
      [949.92653, 2591.7823, 3541.7088, 4.7496327, 12.958911, 17.708544],
      [      4.8, 6.5046393, 4.7496327,       2.4, 3.2523197, 2.3748163],
      [6.5046393, 13.009279, 12.958911, 3.2523197, 6.5046393, 6.4794557],
      [4.7496327, 12.958911, 17.708544, 2.3748163, 6.4794557,  8.854272]
    ]
  }
}

export const O2R2P2C0_input = {
  user_mode: constants.USER_MODE.GUIDED,
  target_event: constants.TARGET_EVENT.WAVR,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
    constants.STATISTICAL_TESTS.PILLAI_BARTLET,
    constants.STATISTICAL_TESTS.WILKS_LIKLIEHOOD,
    constants.STATISTICAL_TESTS.GEISSER_GREENHOUSE
  ],
  type_one_error: 0.05,
  outcomes: ['hr', 'Vo'],
  repeated_measures: [
    {dimension: 'Time', units: 'days', type: constants.REPEATED_MEASURE_TYPES[0], values: [0, 1, 2, 3]},
    {dimension: 'Device', type: constants.REPEATED_MEASURE_TYPES[1], values: [0, 1]}
  ],
  cluster: null,
  predictors: [
    {name: 'gender', type: constants.BETWEEN_ISU_TYPES.NOMINAL,  groups: ['m', 'f']},
    {name: 'race', type: constants.BETWEEN_ISU_TYPES.NOMINAL, groups: ['b', 'w', 'h']}],
  smallest_group: 5,
  groups: [
    {group: '', table: [[1, 1, 1], [1, 1, 1]]}
  ],
  gaussian_covariate: null,
  hypothesis: 'Time x Device x gender x race',
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [
  [60, 61, 100, 110,  80,  83, 55, 58],
  [70, 65, 110, 125,  88,  90, 70, 70],
  [65, 61, 100, 115,  85,  86, 65, 64],
  [70, 72, 110, 112,  98, 100, 75, 76],
  [75, 76, 130, 127, 110, 112, 80, 79],
  [71, 68, 120, 122, 100, 100, 80, 81]]},
    {means: [
  [1.5, 1.6, 2.5, 2.6, 2  , 1.9, 1.8, 1.8],
  [1.3, 1.3, 2.3, 2.5, 1.8, 2  , 1.7, 1.9],
  [1.4, 1.3, 2.3, 2.4, 1.8, 1.8, 1.7, 1.6],
  [0.9, 1  , 1.8, 1.9, 1.3, 1.3, 1.2, 1.1],
  [0.6, 0.8, 1.8, 1.8, 1.3, 1.4, 1.3, 1.2],
  [0.7, 0.7, 1.8, 1.7, 1.3, 1.2, 1.2, 1.1]]},
    ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'hr', st_dev: 10},
    {outcome: 'Vo', st_dev: 0.5}
  ],
  parameters_outcome_correlation: [
    [null, null],
    [0.1, null]
  ],
  parameters_outcome_repeated_measure_stdev: [
    {stdevs: [1, 1, 1, 1]},
    {stdevs: [1, 1]}
  ],
  parameters_repeated_measure_correlations: [
    {table: [
[null, null, null, null],
[0.8, null, null, null],
[0.457946721791957,    0.8,    null, null],
[0.26214400000000015,    0.457946721791957,    0.8,    null]
    ]},
    {table: [
[null, null],
[0.5, null]
    ]},
  ],
  parameters_intra_class_correlation: [1],
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: [1],
  power_method: null,
  power_curve: null
}
