import {constants} from '../../src/app/shared/model/constants';


export const hw5_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
  ],
  type_one_error: [0.05],
  outcomes: ['SOAM1'],
  repeated_measures: [
    {dimension: 'BrainRegion', units: '', type: constants.REPEATED_MEASURE_TYPES[1], values: [0, 1]}
  ],
  cluster: null,
  predictors: [
    {name: 'Treatment', groups: ['Placebo', 'Chemotherapy']},
    {name: 'Genotype', groups: ['A', 'B', 'C', 'D']}
  ],
  smallest_group: [5],
  groups: [
    {group: '', table: [[1, 1, 1, 2], [1, 1, 1, 2]]}
  ],
  gaussian_covariate: null,
  hypothesis: 'Treatment x Genotype',
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[3.145],
      [3.145],
      [3.145],
      [3.145],
      [2.125],
      [2.325],
      [2.525],
      [2.975]]
    }
  ],
  parameters_scale_factor: [0.8, 1, 1.4],
  parameters_standard_deviation: [
    {outcome: 'SOAM1', st_dev: 0.2623928}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: [
    {stdevs: [1, 1]}
  ],
  parameters_repeated_measure_correlations: [
    {table: [
        [null, null],
        [1, null]
      ]}
  ],
  parameters_intra_class_correlation: null,
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: [0.9, 1, 1.5],
  power_method: null,
  power_curve: null
};


export const hw5_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    { 'test': 'Hotelling Lawley Trace', 'power': 0.891419312543, 'alpha': 0.05, 'target_power': null, 'means_scale_factor': 0.8, 'variance_scale_factor': 0.9, 'total_n': 50 },
    { 'test': 'Hotelling Lawley Trace', 'power': 0.853786176758, 'alpha': 0.05, 'target_power': null, 'means_scale_factor': 0.8, 'variance_scale_factor': 1, 'total_n': 50 },
    { 'test': 'Hotelling Lawley Trace', 'power': 0.671258998237, 'alpha': 0.05, 'target_power': null, 'means_scale_factor': 0.8, 'variance_scale_factor': 1.5, 'total_n': 50 },
    { 'test': 'Hotelling Lawley Trace', 'power': 0.983191226555, 'alpha': 0.05, 'target_power': null, 'means_scale_factor': 1, 'variance_scale_factor': 0.9, 'total_n': 50 },
    { 'test': 'Hotelling Lawley Trace', 'power': 0.970965864159, 'alpha': 0.05, 'target_power': null, 'means_scale_factor': 1, 'variance_scale_factor': 1, 'total_n': 50 },
    { 'test': 'Hotelling Lawley Trace', 'power': 0.869036994296, 'alpha': 0.05, 'target_power': null, 'means_scale_factor': 1, 'variance_scale_factor': 1.5, 'total_n': 50 },
    { 'test': 'Hotelling Lawley Trace', 'power': 0.999956981223, 'alpha': 0.05, 'target_power': null, 'means_scale_factor': 1.4, 'variance_scale_factor': 0.9, 'total_n': 50 },
    { 'test': 'Hotelling Lawley Trace', 'power': 0.999842045122, 'alpha': 0.05, 'target_power': null, 'means_scale_factor': 1.4, 'variance_scale_factor': 1, 'total_n': 50 },
    { 'test': 'Hotelling Lawley Trace', 'power': 0.993847289761, 'alpha': 0.05, 'target_power': null, 'means_scale_factor': 1.4, 'variance_scale_factor': 1.5, 'total_n': 50 }
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
      [1]
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
