import {constants} from '../../src/app/shared/model/constants';

// Example5 -- Test in multivariate model with two within factors;


export const powerlib_example5_input = {
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
  type_one_error: [0.04],
  outcomes: ['outcome1'],
  repeated_measures: [
    {dimension: 'repm1', units: 'dkn', type: constants.REPEATED_MEASURE_TYPES[1], values: [1, 2, 4]},
    {dimension: 'repm2', units: 'dkn', type: constants.REPEATED_MEASURE_TYPES[1], values: [1, 3, 5]}
  ],
  cluster: null,
  predictors: null,
  smallest_group: [20],
  groups: null,
  gaussian_covariate: null,
  hypothesis: 'repm1 x repm2',
  definefullbeta: null,
  hypothesis_between: null,
  hypothesis_within: {
    nature: 'trends'
  },
  theta0: null,
  marginal_means: [
    {means: [[0.1133287, 0.0714337, -0.184762, -0.184762, 0.1133287, 0.0714337, 0.0714337, -0.184762, 0.1133287]]}
  ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'outcome1', st_dev: 1.1}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: null,
  parameters_repeated_measure_correlations: [
    {table: [
        [null, null, null],
        [ 0.4, null, null],
        [ 0.3,  0.2, null]
      ]},
    {
      table: [
        [null, null, null],
        [0.7, null, null],
        [0.7, 0.7, null]
      ]
    }
  ],
  parameters_intra_class_correlation: null,
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: [0.5, 1, 2],
  power_method: null,
  power_curve: null
};


export const powerlib_example5_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {test: 'Hotelling Lawley Trace', alpha: 0.04, variability_scale_factor: 0.5, mean_scale_factor: 1, total_N: 20, power: 0.9376819},
    {test: 'Hotelling Lawley Trace', alpha: 0.04, variability_scale_factor:   1, mean_scale_factor: 1, total_N: 20, power: 0.6463669},
    {test: 'Hotelling Lawley Trace', alpha: 0.04, variability_scale_factor:   2, mean_scale_factor: 1, total_N: 20, power: 0.3374283},
    {test: 'Pillai-Bartlett Trace', alpha: 0.04, variability_scale_factor: 0.5, mean_scale_factor: 1, total_N: 20, power: 0.9376819},
    {test: 'Pillai-Bartlett Trace', alpha: 0.04, variability_scale_factor:   1, mean_scale_factor: 1, total_N: 20, power: 0.6463669},
    {test: 'Pillai-Bartlett Trace', alpha: 0.04, variability_scale_factor:   2, mean_scale_factor: 1, total_N: 20, power: 0.3374283},
    {test: 'Wilks Likelihood Ratio', alpha: 0.04, variability_scale_factor: 0.5, mean_scale_factor: 1, total_N: 20, power: 0.9376819},
    {test: 'Wilks Likelihood Ratio', alpha: 0.04, variability_scale_factor:   1, mean_scale_factor: 1, total_N: 20, power: 0.6463669},
    {test: 'Wilks Likelihood Ratio', alpha: 0.04, variability_scale_factor:   2, mean_scale_factor: 1, total_N: 20, power: 0.3374283},
    {test: 'Box Corrected', alpha: 0.04, variability_scale_factor: 0.5, mean_scale_factor: 1, total_N: 20, power: 0.7972679},
    {test: 'Box Corrected', alpha: 0.04, variability_scale_factor:   1, mean_scale_factor: 1, total_N: 20, power: 0.3197696},
    {test: 'Box Corrected', alpha: 0.04, variability_scale_factor:   2, mean_scale_factor: 1, total_N: 20, power: 0.0867985},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.04, variability_scale_factor: 0.5, mean_scale_factor: 1, total_N: 20, power: 0.9685708},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.04, variability_scale_factor:   1, mean_scale_factor: 1, total_N: 20, power: 0.7046751},
    {test: 'Geisser-Greenhouse Corrected', alpha: 0.04, variability_scale_factor:   2, mean_scale_factor: 1, total_N: 20, power: 0.3576926},
    {test: 'Huynh-Feldt Corrected', alpha: 0.04, variability_scale_factor: 0.5, mean_scale_factor: 1, total_N: 20, power: 0.9770971},
    {test: 'Huynh-Feldt Corrected', alpha: 0.04, variability_scale_factor:   1, mean_scale_factor: 1, total_N: 20, power: 0.7494748},
    {test: 'Huynh-Feldt Corrected', alpha: 0.04, variability_scale_factor:   2, mean_scale_factor: 1, total_N: 20, power: 0.4089581},
    {test: 'Uncorrected', alpha: 0.04, variability_scale_factor: 0.5, mean_scale_factor: 1, total_N: 20, power: 0.9780201},
    {test: 'Uncorrected', alpha: 0.04, variability_scale_factor:   1, mean_scale_factor: 1, total_N: 20, power:  0.754869},
    {test: 'Uncorrected', alpha: 0.04, variability_scale_factor:   2, mean_scale_factor: 1, total_N: 20, power: 0.4155764}
  ]
};
