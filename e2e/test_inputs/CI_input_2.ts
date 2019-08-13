import {constants} from '../../src/app/shared/model/constants';

export const CI_input_2 = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    // constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
    constants.STATISTICAL_TESTS.UNCORRECTED
  ],
  type_one_error: [0.05],
  outcomes: ['memory of pain'],
  repeated_measures: [
    {dimension: 'Time', units: 'months', type: constants.REPEATED_MEASURE_TYPES[0], values: [0, 6, 12]},
  ],
  cluster: null,
  predictors: [
    {name: 'Treatment', groups: ['SensoryFocus', 'StandardCare']}
  ],
  smallest_group: 15,
  groups: [
    {group: '', table: [[1], [1]]}
  ],
  gaussian_covariate: null,
  hypothesis: 'Treatment x Time',
  marginal_hypothesis: true,
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[3.6, 2.8, 0.9],
        [4.5, 4.3, 3.0]]
    }
  ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'memory of pain', st_dev: 0.9}
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
  power_curve: null,
  confidence_interval: {
    betaknown: true,
    lowertailprob: 0.025,
    uppertailprob: 0.025,
    rankofdesign: 10,
    samplesizeforbetasigma: 1000
  }
}

export const CI_output_2 = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    // {
    //   alpha: 0.05,
    //   means_scale_factor: 1,
    //   power: 0.812214150393,
    //   target_power: null,
    //   test: 'Hotelling Lawley Trace',
    //   total_n: 30,
    //   variance_scale_factor: 1,
    //   lower_bound: 0.7740371,
    //   upper_bound: 0.8461661
    // },
    {
      alpha: 0.05,
      means_scale_factor: 1,
      power: 0.8609455,
      target_power: null,
      test: 'Uncorrected',
      total_n: 30,
      variance_scale_factor: 1,
      lower_bound: 0.8389462,
      upper_bound: 0.8808168
    }
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
      [ 1, 1],
      [-1, 0],
      [ 0, -1]
    ],
    sigma_star: [
      [ 0.81, 0.486],
      [0.486, 0.972]
    ],
    theta_zero: [
      [ 0, 0]
    ],
    alpha: 0.05,
    total_n: 30,
    theta: [
      [0.6, 1.2]
    ],
    m: [
      [2]
    ],
    nu_e: 28,
    hypothesis_sum_square: [
      [2.7,  5.4],
      [5.4, 10.8]
    ],
    error_sum_square: [
      [22.680, 13.608],
      [13.608, 27.216]
    ]
  }
}
