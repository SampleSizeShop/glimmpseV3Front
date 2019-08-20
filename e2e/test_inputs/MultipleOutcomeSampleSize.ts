import {constants} from '../../src/app/shared/model/constants';

export const MultipleOutcomeSampleSize_input = {
  user_mode: constants.USER_MODE.GUIDED,
  target_event: constants.TARGET_EVENT.WAVR,
  solve_for: {solve_for: constants.SOLVE_FOR.SAMPLE_SIZE, power: [0.9]},
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
    constants.STATISTICAL_TESTS.PILLAI_BARTLET,
    constants.STATISTICAL_TESTS.WILKS_LIKLIEHOOD,
    constants.STATISTICAL_TESTS.BOX_CORRECTION,
    constants.STATISTICAL_TESTS.GEISSER_GREENHOUSE,
    constants.STATISTICAL_TESTS.HUYNH_FELDT,
    constants.STATISTICAL_TESTS.UNCORRECTED
  ],
  type_one_error: [0.01],
  outcomes: ['DASI', 'IL10'],
  repeated_measures: [
    {dimension: 'time', units: 'months', type: constants.REPEATED_MEASURE_TYPES[0], values: [1, 3, 9, 24, 60]}
  ],
  cluster: {element: 'patient', levels: [{name: 'clinic', no_elements: 5}, {name: 'room', no_elements: 2}]},
  predictors: [
    {name: 'gender', groups: ['m', 'f']},
    {name: 'treatment', groups: ['cell', 'placebo']}],
  smallest_group: null,
  groups: [
    {group: '', table: [[3, 1], [4, 1]]}
  ],
  gaussian_covariate: null,
  hypothesis: 'gender x treatment x time',
  marginal_hypothesis: true,
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [
        [20, 25, 35, 40, 38],
        [20, 21, 23, 20, 21],
        [18, 19, 21, 25, 25],
        [18, 18, 19, 18, 19]
      ]},
    {means: [
        [1000, 100, 500, 600, 900],
        [1000, 900, 900, 900, 900],
        [1000,  50, 400, 700, 900],
        [1000, 800, 900, 900, 900]
      ]}
  ],
  parameters_scale_factor: [0.5],
  parameters_standard_deviation: [
    {outcome: 'DASI', st_dev: 30},
    {outcome: 'IL10', st_dev: 800}
  ],
  parameters_outcome_correlation: [
    [null, null],
    [0.1, null]
  ],
  parameters_outcome_repeated_measure_stdev: [
    {stdevs: [1, 1, 1, 1, 1]}
  ],
  parameters_repeated_measure_correlations: [
    {table: [
        [null,null,null,null,null],
        [0.6400000000000001,null,null,null,null],
        [0.6251423485468612,0.6300561735465424,null,null,null],
        [0.5894897865960865,0.5941233707024357,0.6082437994057219,null,null],
        [0.5120000000000001,0.5160244888315197,0.5282887547449786,0.5602398554844872,null]
      ]}
  ],
  parameters_intra_class_correlation: [0.44, 0.68],
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: [0.5],
  power_method: null,
  power_curve: null
}

export const MultipleOutcomeSampleSize_output = {
  message: 'OK',
  status: 200,
  mimetype: 'application/json',
  results: [
    {
      'alpha': 0.01,
      'means_scale_factor': 0.5,
      'power': 0.9007350182854427,
      'target_power': 0.9,
      'test': 'Hotelling Lawley Trace',
      'total_n': 1341,
      'variance_scale_factor': 0.5
    },
    {
      'alpha': 0.01,
      'means_scale_factor': 0.5,
      'power': 0.9001172267487152,
      'target_power': 0.9,
      'test': 'Uncorrected',
      'total_n': 4095,
      'variance_scale_factor': 0.5
    },
    {
      'alpha': 0.01,
      'means_scale_factor': 0.5,
      'power': 0.9007350182854971,
      'target_power': 0.9,
      'test': 'Pillai-Bartlett Trace',
      'total_n': 1341,
      'variance_scale_factor': 0.5
    },
    {
      'alpha': 0.01,
      'means_scale_factor': 0.5,
      'power': 0.9007350182854432,
      'target_power': 0.9,
      'test': 'Wilks Likelihood Ratio',
      'total_n': 1341,
      'variance_scale_factor': 0.5
    },
    {
      'alpha': 0.01,
      'means_scale_factor': 0.5,
      'power': 0.9003941874414697,
      'target_power': 0.9,
      'test': 'Box Corrected',
      'total_n': 9738,
      'variance_scale_factor': 0.5
    },
    {
      'alpha': 0.01,
      'means_scale_factor': 0.5,
      'power': 0.900195467786243	,
      'target_power': 0.9,
      'test': 'Geisser-Greenhouse Corrected',
      'total_n': 5319,
      'variance_scale_factor': 0.5
    },
    {
      'alpha': 0.01,
      'means_scale_factor': 0.5,
      'power': 0.9003245310216412,
      'target_power': 0.9,
      'test': 'Huynh-Feldt Corrected',
      'total_n': 5319,
      'variance_scale_factor': 0.5
    }
  ],
  model: {
    essence_design_matrix: null,
    repeated_rows_in_design_matrix: null,
    hypothesis_beta: null,
    c_matrix: null,
    u_matrix: null,
    sigma_star: null,
    theta_zero: null,
    alpha: 0.01,
    total_n: null,
    theta: null
  }
};
