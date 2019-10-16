import {constants} from '../../src/app/shared/model/constants';

// POWERLIB example 1, two sample t-test

export const powerlib_example1_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
  ],
  type_one_error: [0.05],
  outcomes: ['Outcome'],
  repeated_measures: null,
  cluster: null,
  predictors: [
    {name: 'group', groups: ['g1', 'g2']}
  ],
  smallest_group: [10],
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
  parameters_scale_factor: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1, 1.05, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2],
  parameters_standard_deviation: [
    {outcome: 'Outcome', st_dev: 1}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: null,
  parameters_repeated_measure_correlations: null,
  parameters_intra_class_correlation: null,
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: [0.32, 1, 2.05],
  power_method: null,
  power_curve: null
};


export const powerlib_example1_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [

    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 0.05, total_N: 20, power: 0.054},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  0.1, total_N: 20, power: 0.066},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 0.15, total_N: 20, power: 0.087},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  0.2, total_N: 20, power: 0.116},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 0.25, total_N: 20, power: 0.155},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  0.3, total_N: 20, power: 0.202},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 0.35, total_N: 20, power: 0.258},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  0.4, total_N: 20, power: 0.322},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 0.45, total_N: 20, power: 0.391},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  0.5, total_N: 20, power: 0.465},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 0.55, total_N: 20, power: 0.539},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  0.6, total_N: 20, power: 0.612},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 0.65, total_N: 20, power: 0.681},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  0.7, total_N: 20, power: 0.744},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 0.75, total_N: 20, power: 0.801},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  0.8, total_N: 20, power: 0.848},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 0.85, total_N: 20, power: 0.888},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  0.9, total_N: 20, power:  0.92},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 0.95, total_N: 20, power: 0.944},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:    1, total_N: 20, power: 0.962},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 1.05, total_N: 20, power: 0.975},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  1.1, total_N: 20, power: 0.984},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 1.15, total_N: 20, power:  0.99},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  1.2, total_N: 20, power: 0.994},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 1.25, total_N: 20, power: 0.997},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  1.3, total_N: 20, power: 0.998},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 1.35, total_N: 20, power: 0.999},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  1.4, total_N: 20, power: 0.999},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 1.45, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  1.5, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 1.55, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  1.6, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 1.65, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  1.7, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 1.75, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  1.8, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 1.85, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  1.9, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 1.95, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:    2, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 2.05, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  2.1, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 2.15, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  2.2, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 2.25, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  2.3, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 2.35, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  2.4, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor: 2.45, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 0.32, mean_scale_factor:  2.5, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 0.05, total_N: 20, power: 0.051},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  0.1, total_N: 20, power: 0.055},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 0.15, total_N: 20, power: 0.062},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  0.2, total_N: 20, power: 0.071},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 0.25, total_N: 20, power: 0.083},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  0.3, total_N: 20, power: 0.097},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 0.35, total_N: 20, power: 0.115},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  0.4, total_N: 20, power: 0.135},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 0.45, total_N: 20, power: 0.159},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  0.5, total_N: 20, power: 0.185},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 0.55, total_N: 20, power: 0.214},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  0.6, total_N: 20, power: 0.246},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 0.65, total_N: 20, power:  0.28},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  0.7, total_N: 20, power: 0.317},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 0.75, total_N: 20, power: 0.355},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  0.8, total_N: 20, power: 0.395},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 0.85, total_N: 20, power: 0.436},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  0.9, total_N: 20, power: 0.478},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 0.95, total_N: 20, power:  0.52},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:    1, total_N: 20, power: 0.562},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 1.05, total_N: 20, power: 0.603},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  1.1, total_N: 20, power: 0.643},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 1.15, total_N: 20, power: 0.682},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  1.2, total_N: 20, power: 0.718},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 1.25, total_N: 20, power: 0.753},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  1.3, total_N: 20, power: 0.785},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 1.35, total_N: 20, power: 0.814},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  1.4, total_N: 20, power: 0.841},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 1.45, total_N: 20, power: 0.865},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  1.5, total_N: 20, power: 0.887},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 1.55, total_N: 20, power: 0.906},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  1.6, total_N: 20, power: 0.922},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 1.65, total_N: 20, power: 0.937},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  1.7, total_N: 20, power: 0.949},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 1.75, total_N: 20, power: 0.959},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  1.8, total_N: 20, power: 0.967},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 1.85, total_N: 20, power: 0.974},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  1.9, total_N: 20, power:  0.98},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 1.95, total_N: 20, power: 0.985},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:    2, total_N: 20, power: 0.988},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 2.05, total_N: 20, power: 0.991},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  2.1, total_N: 20, power: 0.993},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 2.15, total_N: 20, power: 0.995},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  2.2, total_N: 20, power: 0.996},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 2.25, total_N: 20, power: 0.997},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  2.3, total_N: 20, power: 0.998},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 2.35, total_N: 20, power: 0.999},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  2.4, total_N: 20, power: 0.999},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor: 2.45, total_N: 20, power: 0.999},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor:    1, mean_scale_factor:  2.5, total_N: 20, power:     1},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 0.05, total_N: 20, power: 0.051},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  0.1, total_N: 20, power: 0.053},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 0.15, total_N: 20, power: 0.056},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  0.2, total_N: 20, power:  0.06},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 0.25, total_N: 20, power: 0.066},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  0.3, total_N: 20, power: 0.073},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 0.35, total_N: 20, power: 0.081},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  0.4, total_N: 20, power: 0.091},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 0.45, total_N: 20, power: 0.102},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  0.5, total_N: 20, power: 0.115},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 0.55, total_N: 20, power: 0.129},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  0.6, total_N: 20, power: 0.144},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 0.65, total_N: 20, power: 0.161},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  0.7, total_N: 20, power: 0.179},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 0.75, total_N: 20, power: 0.199},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  0.8, total_N: 20, power:  0.22},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 0.85, total_N: 20, power: 0.242},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  0.9, total_N: 20, power: 0.265},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 0.95, total_N: 20, power:  0.29},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:    1, total_N: 20, power: 0.315},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 1.05, total_N: 20, power: 0.342},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  1.1, total_N: 20, power:  0.37},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 1.15, total_N: 20, power: 0.398},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  1.2, total_N: 20, power: 0.426},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 1.25, total_N: 20, power: 0.455},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  1.3, total_N: 20, power: 0.485},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 1.35, total_N: 20, power: 0.514},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  1.4, total_N: 20, power: 0.543},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 1.45, total_N: 20, power: 0.573},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  1.5, total_N: 20, power: 0.601},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 1.55, total_N: 20, power: 0.629},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  1.6, total_N: 20, power: 0.657},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 1.65, total_N: 20, power: 0.684},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  1.7, total_N: 20, power: 0.709},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 1.75, total_N: 20, power: 0.734},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  1.8, total_N: 20, power: 0.758},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 1.85, total_N: 20, power:  0.78},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  1.9, total_N: 20, power: 0.801},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 1.95, total_N: 20, power: 0.821},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:    2, total_N: 20, power:  0.84},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 2.05, total_N: 20, power: 0.857},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  2.1, total_N: 20, power: 0.873},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 2.15, total_N: 20, power: 0.888},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  2.2, total_N: 20, power: 0.901},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 2.25, total_N: 20, power: 0.913},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  2.3, total_N: 20, power: 0.924},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 2.35, total_N: 20, power: 0.934},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  2.4, total_N: 20, power: 0.943},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor: 2.45, total_N: 20, power: 0.951},
    {test: 'Hotelling Lawley Trace', alpha: 0.05, variability_scale_factor: 2.05, mean_scale_factor:  2.5, total_N: 20, power: 0.958}
  ]
};