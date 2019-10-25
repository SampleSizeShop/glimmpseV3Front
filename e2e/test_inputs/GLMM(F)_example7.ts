import {constants} from '../../src/app/shared/model/constants';

// GLMM(F) Example 7. Power for a time by treatment interaction
// using orthogonal polynomial contrast for time;

export const GLMM_F_example7_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
    constants.STATISTICAL_TESTS.PILLAI_BARTLET,
    constants.STATISTICAL_TESTS.WILKS_LIKLIEHOOD,
    constants.STATISTICAL_TESTS.BOX_CORRECTION,
    constants.STATISTICAL_TESTS.GEISSER_GREENHOUSE,
    constants.STATISTICAL_TESTS.HUYNH_FELDT,
    constants.STATISTICAL_TESTS.UNCORRECTED
  ],
  type_one_error: [0.05],
  outcomes: ['outcome1'],
  repeated_measures: [
    {dimension: 'time', units: '', type: constants.REPEATED_MEASURE_TYPES[0], values: [1, 2, 3, 4, 5]},
  ],
  cluster: null,
  predictors: [
    {name: 'treatment', groups: ['drug', 'placebo']}
  ],
  smallest_group: [10, 20, 40],
  groups: [
    {group: '', table: [[1], [1]]}
  ],
  gaussian_covariate: null,
  hypothesis: 'treatment x time',
  definefullbeta: null,
  marginal_hypothesis: true,
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[0, 0, 0, 0, 1], [1, 0, 0, 0, 0]]}
  ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'outcome1', st_dev: 1.224745}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: [
    {stdevs: [1, 1, 1, 1, 1]}
  ],
  parameters_repeated_measure_correlations: [
    {table: [
        [null, null, null, null, null],
        [0.25, null, null, null, null],
        [0.25, 0.25, null, null, null],
        [0.25, 0.25, 0.25, null, null],
        [0.25, 0.25, 0.25, 0.25, null]
      ]}
  ],
  parameters_intra_class_correlation: [1],
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: null,
  power_method: null,
  power_curve: null
}

export const GLMM_F_example7__output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {test: 'Uncorrected', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 20, power: 0.6245526},
    {test: 'Uncorrected', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 40, power:  0.9325210},
    {test: 'Uncorrected', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 80, power: 0.9992799},
    {test: 'Box Corrected', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 20, power: 0.2329963},
    {test: 'Box Corrected', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 40, power: 0.7006865},
    {test: 'Box Corrected', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 80, power: 0.9881538},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 20, power: 0.5735035},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 40, power: 0.9240191},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 80, power: 0.9992016},
    {test: 'Huynh-Feldt Corrected', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 20, power: 0.6245526},
    {test: 'Huynh-Feldt Corrected', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 40, power: 0.9325210},
    {test: 'Huynh-Feldt Corrected', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 80, power: 0.9992799},
    {test: 'Wilks Likelihood Ratio', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 20, power: 0.5097624},
    {test: 'Wilks Likelihood Ratio', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 40, power: 0.9024619},
    {test: 'Wilks Likelihood Ratio', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 80, power: 0.9988508},
    {test: 'Pillai-Bartlett Trace', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 20, power: 0.5097624},
    {test: 'Pillai-Bartlett Trace', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 40, power: 0.9024619},
    {test: 'Pillai-Bartlett Trace', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 80, power: 0.9988508},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 20, power: 0.5097624},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 40, power: 0.9024619},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 1, mean_scale_factor: 1, total_N: 80, power: 0.9988508}
  ]
}
