import {constants} from '../../src/app/shared/constants';

export const example_1 = {
  user_mode: constants.USER_MODE.GUIDED,
  target_event: constants.TARGET_EVENT.REJECT_NULL,
  solve_for: {solve_for: constants.SOLVE_FOR.POWER},
  statistical_tests: [
    constants.STATISTICAL_TESTS.HUYNH_FELDT
  ],
  type_one_error: 0.05,
  outcomes: ['bp'],
  repeated_measures: null,
  cluster: null,
  predictors: null,
  smallest_group: 10,
  groups: null,
  gaussian_covariate: null,
  hypothesis: null,
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[80]]}
    ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'bp', st_dev: 15}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: null,
  parameters_repeated_measure_correlations: null,
  parameters_intra_class_correlation: null,
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: null,
  power_method: null,
  power_curve: null
}
