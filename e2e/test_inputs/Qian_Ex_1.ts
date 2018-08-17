import {constants} from '../../src/app/shared/constants';

export const Qian_Ex_1_output = {
  message: "OK",
  status: 200,
  mimetype: "application/json",
  results: [
    {
test: "Hotelling Lawley Trace",
power: 0.05
    }],
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
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
    ],
    c_matrix: [
      [ 1, -1, -1, 1, 0, 0 ],
      [ 1, -1, 0, 0, -1, 1 ]
    ],
    u_matrix: [
      [  1,  0,  1,  0,  1,  0 ],
      [  0,  1,  0,  1,  0,  1 ],
      [ -1,  0,  0,  0,  0,  0 ],
      [  0, -1,  0,  0,  0,  0 ],
      [  0,  0, -1,  0,  0,  0 ],
      [  0,  0,  0, -1,  0,  0 ],
      [  0,  0,  0,  0, -1,  0 ],
      [  0,  0,  0,  0,  0, -1 ],
      [ -1,  0, -1,  0, -1,  0 ],
      [  0, -1,  0, -1,  0, -1 ],
      [  1,  0,  0,  0,  0,  0 ],
      [  0,  1,  0,  0,  0,  0 ],
      [  0,  0,  1,  0,  0,  0 ],
      [  0,  0,  0,  1,  0,  0 ],
      [  0,  0,  0,  0,  1,  0 ],
      [  0,  0,  0,  0,  0,  1 ]
    ],
    sigma_star: [
      [ 23808, 0,        11904, 0,        11904, 0        ],
      [ 0,     0.013392, 0,     0.006696, 0,     0.006696 ],
      [ 11904, 0,        25600, 0,        12800, 0        ],
      [ 0,     0.006696, 0,     0.0144,   0,     0.0072   ],
      [ 11904, 0,        12800, 0,        25600, 0        ],
      [ 0,     0.006696, 0,     0.0072,   0,     0.0144   ]
    ],
    theta_zero: [
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ]
    ],
    alpha: 0.05,
    total_n: 30,
    theta: [
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ]
    ],
    m: [
      [ 4, 2 ],
      [ 2, 4 ]
    ],
    nu_e: 24,
    hypothesis_sum_square: [
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ]],
    error_sum_square: [
      [ 571392, 0,                   285696, 0,                   285696, 0                   ],
      [ 0,      0.32140799999999997, 0,      0.16070399999999999, 0,      0.16070399999999999 ],
      [ 285696, 0,                   614400, 0,                   307200, 0                   ],
      [ 0,      0.16070399999999999, 0,      0.3456,              0,      0.1728              ],
      [ 285696, 0,                   307200, 0,                   614400, 0                   ],
      [ 0,      0.16070399999999999, 0,      0.1728,              0,      0.3456              ]
    ]
  }
}

export const Qian_Ex_1_input = {
  user_mode: constants.USER_MODE.GUIDED,
  target_event: constants.TARGET_EVENT.WAVR,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY
  ],
  type_one_error: 0.05,
  outcomes: ['hr', 'Vo'],
  repeated_measures: [
    {dimension: 'Time', units: 'days', type: constants.REPEATED_MEASURE_TYPES[0], values: [0, 1, 2, 3]},
    {dimension: 'Device', type: constants.REPEATED_MEASURE_TYPES[1], values: [0, 1]}
  ],
  cluster: {element: 'Class', levels: [{name: 'level1', no_elements: 10}]},
  predictors: [
    {name: 'gender', groups: ['m', 'f']},
    {name: 'race', groups: ['b', 'w', 'h']}],
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
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1]]},
    {means: [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1]]},
    ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'hr', st_dev: 80},
    {outcome: 'Vo', st_dev: 0.06}
  ],
  parameters_outcome_correlation: [
    [null, null],
    [0, null]
  ],
  parameters_outcome_repeated_measure_stdev: [
    {stdevs: [1, 1, 1, 1]},
    {stdevs: [1, 1]}
  ],
  parameters_repeated_measure_correlations: [
    {table: [
[null, null, null, null],
[0.07, null, null, null],
[0,    0,    null, null],
[0,    0,    0,    null]
    ]},
    {table: [
[null, null],
[0   , null]
    ]},
  ],
  parameters_intra_class_correlation: [1],
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: [1],
  power_method: null,
  power_curve: null
}
