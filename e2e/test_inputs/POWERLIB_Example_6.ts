import {constants} from '../../src/app/shared/model/constants';

// POWERLIB example 6, Confidence limits for a univariate model test;

export const powerlib_example6_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
  ],
  type_one_error: [0.01],
  outcomes: ['Outcome'],
  repeated_measures: null,
  cluster: null,
  predictors: [
    {name: 'group', groups: ['g1', 'g2']}
  ],
  smallest_group: [12],
  groups: [
    {group: '', table: [[1], [1]]},
  ],
  gaussian_covariate: null,
  hypothesis: 'group',
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[0], [1]]}
  ],
  parameters_scale_factor: [0.01, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
  parameters_standard_deviation: [
    {outcome: 'Outcome', st_dev: 0.2607681}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: null,
  parameters_repeated_measure_correlations: null,
  parameters_intra_class_correlation: null,
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: null,
  power_method: null,
  power_curve: null,
  confidence_interval: {
    betaknown: true,
    lowertailprob: 0.025,
    uppertailprob: 0.025,
    rankofdesign: 2,
    samplesizeforbetasigma: 24
  }
};


export const powerlib_example6_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.01, total_N: 24, lower_bound:  0.0101414, power: 0.0102836, upper_bound: 0.0104749},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.1, total_N: 24, lower_bound:  0.025691, power: 0.0443929, upper_bound: 0.0736228},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.2, total_N: 24, lower_bound: 0.0892626, power: 0.2015333, upper_bound:  0.371372},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.3, total_N: 24, lower_bound: 0.2319564, power: 0.5120324, upper_bound: 0.7851773},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.4, total_N: 24, lower_bound: 0.4521301, power: 0.8144001, upper_bound: 0.9715483},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.5, total_N: 24, lower_bound: 0.6881901, power: 0.9604594, upper_bound: 0.9987135},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.6, total_N: 24, lower_bound: 0.8644653, power: 0.9955471, upper_bound: 0.9999812},
    {test: 'Hotelling Lawley Trace', alpha: 0.01, variability_scale_factor: 1, mean_scale_factor: 0.7, total_N: 24, lower_bound: 0.9563079, power: 0.9997428, upper_bound: 0.9999999}
  ]
};
