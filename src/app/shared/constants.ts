export const constants = {
  // Guided mode stages and ordering
  STAGES: {
    MODE: 0,
    TARGET_EVENT: 1,
    SOLVE_FOR: 2,
    STATISTICAL_TESTS: 3,
    TYPE_ONE_ERROR: 4,
    WITHIN_ISU_OUTCOMES: 5,
    WITHIN_ISU_REPEATED_MEASURES: 6,
    WITHIN_ISU_CLUSTERS: 7,
    BETWEEN_ISU_PREDICTORS: 8,
    BETWEEN_ISU_SMALLEST_GROUP: 9,
    BETWEEN_ISU_GROUPS: 10,
    GAUSSIAN_COVARIATE: 11,
    HYPOTHESIS_EFFECT_CHOICE: 12,
    HYPOTHESIS_BETWEEN: 13,
    HYPOTHESIS_WITHIN: 14,
    HYPOTHESIS_THETA_0: 15,
    PARAMETERS_MARGINAL_MEANS: 16,
    PARAMETERS_SCALE_FACTOR: 17,
    PARAMETERS_STANDARD_DEVIATION: 18,
    PARAMETERS_OUTCOME_CORRELATION: 19,
    PARAMETERS_REPEATED_MEASURE_ST_DEV: 20,
    PARAMETERS_REPEATED_MEASURE_CORRELATION: 21,
    PARAMETERS_INTRA_CLASS_CORRELATION: 22,
    PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE: 23,
    PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION: 24,
    PARAMETERS_SCALE_FACTOR_VARIANCE: 25,
    OPTIONAL_SPECS_POWER_METHOD: 26,
    OPTIONAL_SPECS_POWER_CURVE_CHOICE: 27,
    OPTIONAL_SPECS_POWER_CURVE_AXES: 28,
    OPTIONAL_SPECS_POWER_CURVE_DATA_SERIES: 29,
    OPTIONAL_SPECS_CI_CHOICE: 30,
    OPTIONAL_SPECS_CI_ASSUMPTIONS: 31,
    OPTIONAL_SPECS_CI_LOWER_TAIL: 32,
    OPTIONAL_SPECS_CI_UPPER_TAIL: 33,
    OPTIONAL_SPECS_CI_BETA_SAMPLE_SIZE: 34,
    OPTIONAL_SPECS_CI_BETA_DESIGN_MATRIX_RANK: 35,
    CALCULATE: 36
  },
  // Target event constants
  TARGET_EVENT_FORM_ERRORS: {
    'power': '',
    'ciwidth': ''
  },
  TYPE_ONE_ERROR_ERRORS: {
    'typeoneerror': ''
  },
  WITHIN_ISU_ERRORS: {
    'singleoutcomeerror': ''
  },
  BETWEEN_ISU_ERRORS: {
    'smallestGroupSize': ''
  },
  BETWEEN_ISU_RELATIVE_GROUP_ERRORS: {
    'relativegroupsizes': ''
  },
  PARAMETERS_STANDARD_DEVIATION_ERRORS: {
    'vectorofstandarddeviations': ''
  },
  PARAMETERS_REPEATED_MEASURE_OUTCOME_ST_DEV_ERRORS: {
    'vectorofstandarddeviations': ''
  },
  PARAMETERS_INTRA_CLASS_CORRELATION_ERRORS: {
    'vectorofcorrelation': ''
  },
  PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE_ERRORS: {
    'covariatevariance': ''
  },
  PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION_ERRORS: {
    'covariatecorrelation': ''
  },
  TARGET_EVENT_VALIDATION_MESSAGES: {
    'power': {
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
  BETWEEN_ISU_VALIDATION_MESSAGES: {
    'smallestGroupSize': {
      'minval': 'Value too low.'
    },
  },
  BETWEEN_ISU_RELATIVE_GROUP_VALIDATION_MESSAGES: {
    'relativegroupsizes': {
      'minval': 'ALL values need to be filled in and >= 0.',
      'required': 'ALL values need to be filled in and >= 0.'
    },
  },
  PARAMETERS_STANDARD_DEVIATION_VALIDATION_MESSAGES: {
    'vectorofstandarddeviations': {
      'required': 'ALL values need to be filled in.'
    },
  },
  PARAMETERS_REPEATED_MEASURE_OUTCOME_ST_DEV_VALIDATION_MESSAGES: {
    'vectorofstandarddeviations': {
      'required': 'ALL values need to be filled in.'
    },
  },
  PARAMETERS_INTRA_CLASS_CORRELATION_VALIDATION_MESSAGES: {
    'vectorofcorrelation': {
      'required': 'ALL values need to be filled in.'
    },
  },
  PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE_VALIDATION_MESSAGES: {
    'covariatevariance': {
      'required': 'Value needs to be filled in.'
    },
  },
  PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION_VALIDATION_MESSAGES: {
    'covariatecorrelation': {
      'required': 'ALL values need to be filled in.'
    },
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
  REPEATED_MEASURE_FORM_ERRORS: {
    'space': 'Your repeated measures cannot be duplicates.',
    'dimensionunits': 'Value needs to be filled in.',
    'repeatsform': ''
  },
  REPEATED_MEASURE_FORM_VALIDATION_MESSAGES: {
    'dimensionunits':{
      'required': 'Value needs to be filled in.'
    },
    'space': {
      'duplicates': 'Your repeated measures cannot be duplicates.\n',
      'required': 'Your repeated measures need to be filled in.\n',
      'minval': 'Value too low.\n'
    },
    'repeatsform': {
      'minval': 'Value too low.',
      'maxval': 'Value too high',
      'required': 'Value needs to be filled in.'
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
    BETWEEN_PREDICTOR: 'Between ISU Predictor',
    CLUSTER: 'Cluster'
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
     [-1,  5, -10, 10, -5, 1]],
  USER_MODE: {
    GUIDED: 'GUIDED',
    FLEX: 'FLEX'
  },
  TARGET_EVENT: {
    REJECT_NULL: 'REJECT NULL',
    CI_WIDTH: 'CI WIDTH',
    WAVR: 'WAVR'
  },
  SOLVE_FOR: {
    POWER: 'POWER',
    SAMPLE_SIZE: 'SAMPLE SIZE'
  },
  getStageName:
    function(value: number){
      const listObj = [];
      Object.keys(this.STAGES).forEach( key => {listObj.push(key)});
      return listObj[value];
    }
};
