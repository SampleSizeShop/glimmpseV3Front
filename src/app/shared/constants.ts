export const constants = {
  // Guided mode stages and ordering
  STAGES: {
    '1':  'MODE',
    '2':  'TARGET_EVENT',
    '3':  'SOLVE_FOR',
    '4':  'STATISTICAL_TESTS',
    '5':  'TYPE_ONE_ERROR',
    '6':  'WITHIN_ISU_OUTCOMES',
    '7':  'WITHIN_ISU_REPEATED_MEASURES',
    '8':  'WITHIN_ISU_CLUSTERS',
    '9':  'BETWEEN_ISU_PREDICTORS',
    '10': 'BETWEEN_ISU_GROUPS',
    '11': 'GAUSSIAN_COVARIATE',
    '12': 'HYPOTHESIS_EFFECT_CHOICE',
    '13': 'HYPOTHESIS_BETWEEN',
    '14': 'HYPOTHESIS_WITHIN',
    '15': 'PARAMETERS_MARGINAL_MEANS',
    '16': 'PARAMETERS_SCALE_FACTOR'
  },
  // Target event constants
  TARGET_EVENT_FORM_ERRORS: {
    'power': '',
    'samplesize': '',
    'ciwidth': ''
  },
  TYPE_ONE_ERROR_ERRORS: {
    'typeoneerror': ''
  },
  WITHIN_ISU_ERRORS: {
    'singleoutcomeerror': ''
  },
  TARGET_EVENT_VALIDATION_MESSAGES: {
    'power': {
      'minval': 'Value too low.',
      'maxval': 'Value too high'
    },
    'samplesize': {
      'minval': 'Value too low.',
      'maxval': 'Value too high'
    },
    'ciwidth': {
      'minval': 'Value too low.',
      'maxval': 'Value too high'
    }
  },
  TYPE_ONE_ERROR_VALIDATION_MESSAGES: {
    'typeoneerror': {
      'minval': 'Value too low.',
      'maxval': 'Value too high'
    }
  },
  WITHIN_ISU_VALIDATION_MESSAGES: {
    'singleoutcome': {}
  },
  REJECTION_EVENT: 'REJECTION',
  CIWIDTH_EVENT: 'CIWIDTH',
  WAVR_EVENT: 'WAVR',
  // Solve for constants
  SOLVE_FOR_POWER: 'POWER',
  SOLVE_FOR_SAMPLESIZE: 'SAMPLESIZE',
  // Statistical Tests Constants
  STATISTICAL_TESTS: {HOTELLING_LAWLEY: 'Hotelling Lawley Trace',
    PILLAI_BARTLET: 'Pillai-Bartlett Trace',
  WILKS_LIKLIEHOOD: 'Wilks Likelihood Ratio',
  BOX_CORRECTION: 'Repeated Measures: Box Correction',
  GEISSER_GREENHOUSE: 'Repeated Measures: Geisser-Greenhouse Correction',
  HUYNH_FELDT: 'Repeated Measures: Huynh-Feldt Correction',
  UNCORRECTED: 'Repeated Measure: uncorrected',
  UNIREP: 'High Dimension, low sample size- UNIREP',
  MULTIREP: 'High Dimension, low sample size - MULTIREP'},
  SEPARATOR: '-',
  CORRELATION_MIN: -1,
  CORRELATION_MAX: 1,
  CORRELATION_MATRIX_FORM_ERRORS: {},
  CORRELATION_MATRIX_VALIDATION_MESSAGES: {
    'minval': 'Value too low.',
    'maxval': 'Value too high'
  },
  MAX_OUTCOMES: 10,
  OUTCOME_FORM_ERRORS: {},
  OUTCOME_FORM_VALIDATION_MESSAGES: {
    'outcomes': {
      'duplicate': 'You have already added that outcome.'
    }
  },
  MAX_REPEATED_MEASURES: 5,
  REPEATED_MEASURE_STAGES: {
    '0': 'DIMENSIONS',
    '1': 'TYPE',
    '2': 'REPEATS',
    '3': 'SPACING'
  },
  REPEATED_MEASURE_TYPES: ['Numeric', 'Categorical', 'Ordinal'],
  REPEATED_MEASURE_FORM_ERRORS: {},
  REPEATED_MEASURE_FORM_VALIDATION_MESSAGES: {
    'outcomes': {
      'duplicate': 'You have already added that outcome.'
    }
  },
  MAX_LEVELS: 10,
  MAX_ELEMENTS: 10,
  CLUSTERS_FORM_ERRORS: {},
  CLUSTERS_FORM_VALIDATION_MESSAGES: {
    'outcomes': {
      'duplicate': 'You have already added that outcome.'
    }
  },
  CLUSTER_STAGES: {
    '0': 'ELEMENT_NAME',
    '1': 'LEVELS',
  },
  BETWEEN_ISU_STAGES: {
    '0': 'PREDICTOR',
    '1': 'GROUPS',
  },
  MAX_PREDICTORS: 5,
  MAX_GROUPS: 10,
  HYPOTHESIS_NATURE: {
    WITHIN: 'Within',
    BETWEEN: 'Between'
  },
  HYPOTHESIS_BETWEEN_NATURE: {
    GLOBAL_TRENDS: 'GLOBAL_TRENDS',
    IDENTITY: 'IDENTITY',
    POLYNOMIAL: 'POLYNOMIAL',
    USER_DEFINED: 'USER_DEFINED',
  },
  HYPOTHESIS_ORIGIN: {
    OUTCOME: 'Outcome',
    REPEATED_MEASURE: 'Repeated Measure',
    BETWEEN_PREDICTOR: 'Between ISU Predictor'
  },
  HYPOTHESIS_EFFECT_TYPE: {
    GRAND_MAEN: 'Grand Mean',
    INTERACTION: 'Interaction',
    MAIN_EFFECT: 'Main Effect'
  },
  C_MATRIX_TYPE: {
    CMATRIX: 'CMATRIX',
    MAIN_EFFECT: 'MAIN_EFFECT',
    POLYNOMIAL: 'POLYNOMIAL',
    AVERAGE: 'AVERAGE',
    IDENTITY: 'IDENTITY'
  },
  LINEAR_POLYNOMIAL_CMATRIX:
    [[-1, 1]],
  QUADRATIC_POLYNOMIAL_CMATRIX:
    [[-1,  0, 1],
     [ 1, -2, 1]],
  CUBIC_POLYNOMIAL_CMATRIX:
    [[-3, -1,  1, 3],
     [ 1, -1, -1, 1],
     [-1,  3, -3, 1]],
  QUINTIC_POLYNOMIAL_CMATRIX:
    [ [-2, -1,  0,  1, 2],
      [ 2, -1, -2, -1, 2],
      [-1,  2,  0, -2, 1],
      [ 1, -4,  6, -4, 1]],
  SEXTIC_POLYNOMIAL_CMATRIX:
    [[-5, -3,  -1,  1,  3, 5],
     [ 5, -1,  -4, -4, -1, 5],
     [-5,  7,   4, -4, -7, 5],
     [ 1, -3,   2,  2, -3, 1],
     [-1,  5, -10, 10, -5, 1]]
};
