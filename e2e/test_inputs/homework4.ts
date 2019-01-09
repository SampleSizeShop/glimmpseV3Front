import {constants} from '../../src/app/shared/constants';


export const hw4_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
  ],
  type_one_error: 0.05,
  outcomes: ['alcohol use score'],
  repeated_measures: [
    {dimension: 'Time', units: 'HalfYears', type: constants.REPEATED_MEASURE_TYPES[0], values: [0, 1, 3, 5]}
  ],
  cluster: {element: 'Student', levels: [{name: 'Neighborhood', no_elements: 2}, {name: 'School', no_elements: 3}, {name: 'Classroom', no_elements: 20}]},
  predictors: [
    {name: 'Treatment', groups: ['Alchohol Education Program', 'StandardCare']}
  ],
  smallest_group: 15,
  groups: [
    {group: '', table: [[2], [1]]}
  ],
  gaussian_covariate: null,
  hypothesis: 'Treatment x Time',
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[5.2, 5.3, 5.3, 5.3],
        [5.2, 5.5, 5.9, 6.2]]
    }
  ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'alcohol use score', st_dev: 4}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: [
    {stdevs: [1, 1, 1, 1]}
  ],
  parameters_repeated_measure_correlations: [
    {table: [
        [null, null, null],
        [0.606355, null, null],
        [0.5132188, 0.5578466, null],
        [0.43438884, 0.47216136, 0.55784660, null]
      ]}
  ],
  parameters_intra_class_correlation: [0.03, 0.04, 0.09],
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: null,
  power_method: null,
  power_curve: null
};


export const hw4_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {test: 'Hotelling Lawley Trace', power: 0.958496951944}
  ],
  model: {
    essence_design_matrix: [
      [1, 0],
      [1, 0],
      [0, 1]
    ],
    repeated_rows_in_design_matrix: 15,
    hypothesis_beta: [
      [5.2, 5.3, 5.3, 5.3],
      [5.2, 5.5, 5.9, 6.2]
    ],
    c_matrix: [
      [ 1, -1]
    ],
    u_matrix: [
      [-1,-1,-1],
      [ 1, 0, 0],
      [ 0, 1, 0],
      [ 0, 0, 1]
    ],
    sigma_star: [
      [ 0.316449, 0.1761625, 0.1734071],
      [0.1761625, 0.3913207, 0.2452838],
      [0.1734071, 0.2452838, 0.4546916]
    ],
    theta_zero: [
      [ 0, 0]
    ],
    alpha: 0.05,
    total_n: 45,
    theta: [
      [-0.2,-0.6,-0.9]
    ],
    m: [
      [1.5]
    ],
    nu_e: 43,
    hypothesis_sum_square: [
      [0.4, 1.2, 1.8],
      [1.2, 3.6, 5.4],
      [1.8, 5.4, 8.1]
    ],
    error_sum_square: [
      [13.607307476784,   7.574988566235,   7.456503760383],
      [ 7.574988566235,  16.826789270327,  10.547205176025],
      [ 7.456503760383,  10.547205176025,  19.551740696365]
    ]
  }
};
