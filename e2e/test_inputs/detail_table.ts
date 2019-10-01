import {constants} from '../../src/app/shared/model/constants';


export const com_calculate_detail_input = {
  user_mode: constants.USER_MODE.GUIDED,
  solve_for: null,
  statistical_tests: [
    constants.STATISTICAL_TESTS.HOTELLING_LAWLEY,
  ],
  type_one_error: [0.01],
  outcomes: ['SOAM1'],
  repeated_measures: null,
  cluster: null,
  predictors: [
    {name: 'Treatment', groups: ['Placebo', 'Chemotherapy']},
    {name: 'Genotype', groups: ['A', 'B', 'C', 'D']}
  ],
  smallest_group: [5],
  groups: [
    {group: '', table: [[1, 1, 1, 2], [1, 1, 1, 2]]}
  ],
  gaussian_covariate: null,
  hypothesis: 'Treatment x Genotype',
  hypothesis_between: null,
  hypothesis_within: null,
  theta0: null,
  marginal_means: [
    {means: [[3.145],
        [3.145],
        [3.145],
        [3.145],
        [2.125],
        [2.325],
        [2.525],
        [2.975]]
    }
  ],
  parameters_scale_factor: null,
  parameters_standard_deviation: [
    {outcome: 'SOAM1', st_dev: 0.2623928}
  ],
  parameters_outcome_correlation: null,
  parameters_outcome_repeated_measure_stdev: [
    {stdevs: [1, 1]}
  ],
  parameters_repeated_measure_correlations: [
    {table: [
        [null, null],
        [1, null]
      ]}
  ],
  parameters_intra_class_correlation: null,
  parameters_gaussian_covariate_variance: null,
  parameters_gaussian_covariate_correlation: null,
  parameters_scale_factor_variance: null,
  power_method: null,
  power_curve: null
};

export const com_calculate_detail_output = {
  group_combination: [
    ['Placebo', 'A'],
    ['Placebo', 'B'],
    ['Placebo', 'C'],
    ['Placebo', 'D'],
    ['Chemotherapy', 'A'],
    ['Chemotherapy', 'B'],
    ['Chemotherapy', 'C'],
    ['Chemotherapy', 'D']
  ],
  per_group_sample_size: [
    5,
    5,
    5,
    10,
    5,
    5,
    5,
    10
  ],
  totalsamplesize: 50,
  predictors: [
    {name: 'Treatment', groups: ['Placebo', 'Chemotherapy']},
    {name: 'Genotype', groups: ['A', 'B', 'C', 'D']}
  ],
}
