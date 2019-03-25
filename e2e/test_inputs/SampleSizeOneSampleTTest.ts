import {constants} from '../../src/app/shared/constants';


export const SampleSizeOneSampleTTest_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: {solve_for: constants.SOLVE_FOR.SAMPLE_SIZE, power: [0.9]},
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
    constants.STATISTICAL_TESTS.UNCORRECTED
  ],
  type_one_error: [0.01],
  outcomes: ['Ki-67'],
  repeated_measures: null,
  cluster: null,
  predictors: null,
  smallest_group: 1,
  groups: null,
  gaussian_covariate: null,
  hypothesis: null,
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: [[42]],
  marginal_means: [
    {means: [[52]]
    }
  ],
  parameters_scale_factor: [0.5],
  parameters_standard_deviation: [
    {outcome: 'Ki-67', st_dev: 25}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: null,
  parameters_repeated_measure_correlations: null,
  parameters_intra_class_correlation: null,
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: [0.5],
  power_method: null,
  power_curve: null
};

export const SampleSizeOneSampleTTest_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {
      'alpha': 0.01,
      'means_scale_factor': 0.5,
      'power': 0.9076446,
      'target_power': 0.9,
      'test': 'Hotelling Lawley Trace',
      'total_n': 22,
      'variance_scale_factor': 0.5
    },
    {
      'alpha': 0.01,
      'means_scale_factor': 0.5,
      'power': 0.9076446,
      'target_power': 0.9,
      'test': 'Uncorrected',
      'total_n': 22,
      'variance_scale_factor': 0.5
    }
  ],
  model: {
    essence_design_matrix: [1],
    repeated_rows_in_design_matrix: 1,
    hypothesis_beta: [52],
    c_matrix: [1],
    u_matrix: [1],
    sigma_star: [625],
    theta_zero: [42],
    alpha: 0.01,
    total_n: null,
    theta: [52]
  }
};
