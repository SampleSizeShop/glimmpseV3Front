import {constants} from '../../src/app/shared/model/constants';

// POWERLIB example 7, Confidence limits for a UNIREP test in a multivariate model;

export const powerlib_example7_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    // constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
    constants.STATISTICAL_TESTS.GEISSER_GREENHOUSE
  ],
  type_one_error: [0.0083333333333],
  outcomes: ['outcome1'],
  repeated_measures: [
    {dimension: 'rep', units: '', type: constants.REPEATED_MEASURE_TYPES[0], values: [1, 2, 3, 4]},
  ],
  cluster: null,
  predictors: [
    {name: 'gender', groups: ['male', 'female']},
    {name: 'region', groups: ['r1', 'r2', 'r3', 'r4', 'r5']}
  ],
  smallest_group: [2, 4, 8, 10],
  groups: [
    {group: '', table: [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]}
  ],
  gaussian_covariate: null,
  hypothesis: 'gender x rep',
  definefullbeta: true,
  marginal_hypothesis: true,
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[2.9, 3.2, 3.7, 3.2],
        [2.9, 3.2, 3.7, 3.2],
        [2.9, 3.2, 3.7, 3.2],
        [2.9, 3.2, 3.7, 3.2],
        [2.9, 3.2, 3.7, 3.2],
        [2.9, 3.2, 3.3, 3.2],
        [2.9, 3.2, 3.3, 3.2],
        [2.9, 3.2, 3.3, 3.2],
        [2.9, 3.2, 3.3, 3.2],
        [2.9, 3.2, 3.3, 3.2]]
    }
  ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'outcome1', st_dev: 0.9}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: [
    {stdevs: [1, 1, 1, 1]}
  ],
  parameters_repeated_measure_correlations: [
    {table: [
        [null, null, null, null],
        [0.4, null, null, null],
        [0.3, 0.2, null, null],
        [0.2, 0.3, 0.2, null]
      ]}
  ],
  parameters_intra_class_correlation: [1],
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: null,
  power_method: null,
  power_curve: null,
  confidence_interval: {
    betaknown: true,
    lowertailprob: 0.025,
    uppertailprob: 0.025,
    rankofdesign: 1,
    samplesizeforbetasigma: 21
  }
}

export const powerlib_example7_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {
      test: 'Geisser-Greenhouse Corrected',
      alpha: 0.0083333333333,
      variability_scale_factor: 1,
      mean_scale_factor: 1,
      total_N: 20,
      power: 0.0220219,
      lower_bound: 0.0162724,
      upper_bound: 0.0299979
    },
    {
      test: 'Geisser-Greenhouse Corrected',
      alpha: 0.0083333333333,
      variability_scale_factor: 1,
      mean_scale_factor: 1,
      total_N:  40,
      power: 0.0527184,
      lower_bound: 0.0338311,
      upper_bound: 0.0803588
    },
    {
      test: 'Geisser-Greenhouse Corrected',
      alpha: 0.0083333333333,
      variability_scale_factor: 1,
      mean_scale_factor: 1,
      total_N:  80,
      power: 0.1420439,
      lower_bound: 0.0832237,
      upper_bound: 0.2260982
    },
    {
      test: 'Geisser-Greenhouse Corrected',
      alpha: 0.0083333333333,
      variability_scale_factor: 1,
      mean_scale_factor: 1,
      total_N: 100,
      power: 0.1972139,
      lower_bound: 0.1141514,
      upper_bound: 0.3113581
    }
  ]
}
