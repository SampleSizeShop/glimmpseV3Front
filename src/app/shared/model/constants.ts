export const constants = {
  // Guided mode stages and ordering
  STAGES: {
    STUDY_TITLE: 0,
    SOLVE_FOR: 1,
    STATISTICAL_TESTS: 2,
    TYPE_ONE_ERROR: 3,
    WITHIN_ISU_OUTCOMES: 4,
    WITHIN_ISU_REPEATED_MEASURES: 5,
    WITHIN_ISU_CLUSTERS: 6,
    BETWEEN_ISU_PREDICTORS: 7,
    GAUSSIAN_COVARIATE: 8,
    HYPOTHESIS_EFFECT_CHOICE: 9,
    HYPOTHESIS_MIXED: 10,
    HYPOTHESIS_BETWEEN: 11,
    HYPOTHESIS_WITHIN: 12,
    HYPOTHESIS_THETA_0: 13,
    BETWEEN_ISU_SMALLEST_GROUP: 14,
    BETWEEN_ISU_GROUPS: 15,
    PARAMETERS_MARGINAL_MEANS: 16,
    PARAMETERS_SCALE_FACTOR: 17,
    PARAMETERS_STANDARD_DEVIATION: 18,
    PARAMETERS_OUTCOME_CORRELATION: 19,
    PARAMETERS_REPEATED_MEASURE_ST_DEV: 20,
    PARAMETERS_REPEATED_MEASURE_CORRELATION: 21,
    PARAMETERS_INTRA_CLASS_CORRELATION: 22,
    PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE: 23,
    PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION: 24,
    PARAMETERS_GAUSSIAN_COVARIATE_POWER: 25,
    PARAMETERS_SCALE_FACTOR_VARIANCE: 26,
    OPTIONAL_SPECS_CONFIDENCE_INTERVALS: 27,
    CALCULATE: 28,
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
    'smallestGroupSize': 'Value needs to be filled in.',
    'required': 'You must specify at least one value for smallest group size.'
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
  PARAMETERS_GAUSSIAN_COVARIATE_POWER_ERRORS: {
    'covariatepower': ''
  },
  BETWEEN_ISU_PREDICTORS_ERRORS: {
    'predictorform': '',
    'groupsformduplicated': '',
    'groupsformtwogroups': '',
  },
  GAUSSIAN_COVARIATE_ERRORS: {
    'gaussiancovariate': ''
  },
  PARAMETERS_SCALE_FACTOR_ERRORS: {
    'scalefactor': ''
  },
  STATISTICAL_TESTS_ERRORS: {},
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
      'maxval': 'Value too high',
      'noalpha': 'You must specify at least one Type I error rate.'
    }
  },
  BETWEEN_ISU_VALIDATION_MESSAGES: {
    'smallestGroupSize': {
      'minval': 'Value too low.',
      'required': 'You must specify at least one value for smallest group size.',
      'pattern' : 'Must be a positive integer.'
    },
  },
  BETWEEN_ISU_RELATIVE_GROUP_VALIDATION_MESSAGES: {
    'relativegroupsizes': {
      'minval': 'ALL values need to be filled in and integers >= 1. Need at least one relative size = 1.',
      'required': 'ALL values need to be filled in and integers >= 1. Need at least one relative size = 1.',
      'notcontainone': 'ALL values need to be filled in and integers >= 1. Need at least one relative size = 1.'
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
      'required': 'ALL values need to be filled in. ',
      'minval': 'Value too low. ',
      'maxval': 'Value too high. '
    },
  },
  PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE_VALIDATION_MESSAGES: {
    'covariatevariance': {
      'required': 'You must define a value for the standard deviation pf your gaussian covariate.'
    },
  },
  PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION_VALIDATION_MESSAGES: {
    'covariatecorrelation': {
      'required': 'All values need to be filled in.'
    },
  },
  PARAMETERS_GAUSSIAN_COVARIATE_POWER_VALIDATION_MESSAGES: {
    'covariatepower': {
      'required': 'You must pick at least one power method. ',
      'minlength': 'To calculate quantile powe you must specify one or more quantiles. ',
    },
  },
  BETWEEN_ISU_PREDICTORS_VALIDATION_MESSAGES: {
    'predictorform': {
      'empty': 'Value needs to be filled in.',
      'duplicate': 'You have already added that predictor name.'
    },
    'groupsformduplicated': {
      'duplicate': 'You have already added that group name.'
    },
  },
  WITHIN_ISU_VALIDATION_MESSAGES: {
    'singleoutcome': {}
  },
  GAUSSIAN_COVARIATE_VALIDATION_MESSAGES: {
    'gaussiancovariate': {
      'required': 'Value needs to be filled in.',
      'minval': 'Value too low.'
    }
  },
  PARAMETERS_SCALE_FACTOR_VALIDATION_MESSAGES: {
    'scalefactor': {
      'required': 'Value needs to be filled in.',
      'minval': 'Value too low.',
      'maxval': 'Value too high'
    }
  },
  STATISTICAL_TESTS_VALIDATION_MESSAGES: {
    'statisticaltestsoptions': {
      'notestselected': 'You must select at least one statistical test, in order to continue.'
    }
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
  BOX_CORRECTION: 'Box Corrected',
  GEISSER_GREENHOUSE: 'Geisser-Greenhouse Corrected',
  HUYNH_FELDT: 'Huynh-Feldt Corrected',
  UNCORRECTED: 'Uncorrected'},
  SEPARATOR: '-',
  CORRELATION_MIN: -1,
  CORRELATION_MAX: 1,
  CORRELATION_MATRIX_FORM_ERRORS: {},
  CORRELATION_MATRIX_VALIDATION_MESSAGES: {
    'zeroCol': 'You cannot have a column of zeroes',
    'minval': 'Value too low.',
    'maxval': 'Value too high'
  },
  MAX_OUTCOMES: 10,
  OUTCOME_FORM_ERRORS: {},
  OUTCOME_FORM_VALIDATION_MESSAGES: {
    'outcomes': {
      'duplicate': 'You have already added that outcome.',
      'nooutcome': 'You must specify at least one outcome.'
    }
  },
  MAX_REPEATED_MEASURES: 5,
  REPEATED_MEASURE_STAGES: {
    INFO: 0,
    DIMENSIONS: 1,
    TYPE: 2,
    REPEATS: 3,
    SPACING: 4
  },
  REPEATED_MEASURE_TYPES: ['Categorical', 'Numeric'],
  REPEATED_MEASURE_FORM_ERRORS: {
    'space': '',
    'dimensionunits': '',
    'duplicate': '',
    'repeatsform': ''
  },
  REPEATED_MEASURE_FORM_VALIDATION_MESSAGES: {
    'dimensionunits': {
      'required': 'You must specify a name for this repeated measure dimension.',
      'duplicate': 'You have already specified this repeated measure dimension.',
    },
    'space': {
      'duplicates': 'Your repeated measures cannot be duplicates.\n',
      'ordered': 'Spacing values must be unique nonnegative integers.\n',
      'required': 'Your spacing values need to be filled in.\n',
      'minval': 'Value too low.\n'
    },
    'repeatsform': {
      'minval': 'Value too low.',
      'maxval': 'Value too high',
      'required': 'Value needs to be filled in.',
      'notint': 'Value needs to be an integer.'
    }
  },
  MAX_LEVELS: 10,
  MAX_ELEMENTS: 10,
  CLUSTERS_FORM_ERRORS: {
    'cluster': 'ISU name is required.',
    'clusterlevelname': 'Each level of clustering must have a name.',
    'elementnumber': 'You must have between 2 and 10000 elements in each level.',
    'clusterlevelrequired': 'You must to specify at least one level of clustering.'
  },
  CLUSTERS_FORM_VALIDATION_MESSAGES: {
    'cluster': {
      'required': 'ISU name is required.'
    },
    'outcomes': {
      'duplicate': 'You have already added that outcome.'
    },
    'clusterlevelname': {
      'required': 'Each level of clustering must have a name.',
      'duplicate': 'You have already added that cluster.'
    },
    'elementnumber': {
      'minval': 'You must have between 2 and 10000 elements in each level.',
      'maxval': 'You must have between 2 and 10000 elements in each level.',
      'required': 'You must specify a number of elements in each clustering level.'
    }
  },
  CLUSTER_STAGES: {
    INFO: 0,
    ELEMENT_NAME: 1,
    LEVELS: 2,
  },
  BETWEEN_ISU_STAGES: {
    INFO: 0,
    NAME: 1,
    TYPE: 2,
    GROUPS: 3
  },
  BETWEEN_ISU_TYPES: {
    NOMINAL: 0,
    CONTINUOUS: 1
  },
  MAX_PREDICTORS: 5,
  MAX_GROUPS: 10,
  HYPOTHESIS_NATURE: {
    WITHIN: 'Within',
    BETWEEN: 'Between'
  },
  CONTRAST_MATRIX_NATURE: {
    GLOBAL_TRENDS: 'All mean differences zero',
    IDENTITY: 'All means zero',
    POLYNOMIAL: 'Trends (Polynomial)',
    USER_DEFINED_PARTIALS: 'Custom',
    CUSTOM_C_MATRIX: 'Custom between contrast (C) Matrix',
    CUSTOM_U_MATRIX: 'Custom within contrast (U) Matrix',
  },
  HYPOTHESIS_BETWEEN_STAGES: {
    INFO: 0,
    ROWS: 1,
    EDIT_CUSTOM: 2
  },
  HYPOTHESIS_MIXED_STAGES: {
    INFO: 0,
    ROWS: 1,
    EDIT_BETWEEN_CUSTOM: 2,
    COLS: 3,
    EDIT_WITHIN_CUSTOM: 4
  },
  HYPOTHESIS_BETWEEN_FORM_ERRORS: {
    'norows': ''
  },
  HYPOTHESIS_WITHIN_FORM_ERRORS: {
    'nocols': ''
  },
  HYPOTHESIS_BETWEEN_VALIDATION_MESSAGES: {
    'norows': {
      'minval': 'Value too low.',
      'maxval': 'Value too high'
    }
  },
  HYPOTHESIS_WITHIN_VALIDATION_MESSAGES: {
    'norows': {
      'minval': 'Value too low.',
      'maxval': 'Value too high'
    }
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
  TYPE_I_ERROR_TOLERANCE: 0.1,
  POWER_METHOD: {UNCONDITIONAL: 'unconditional', QUANTILE: 'quantile'},
};

export function getStageName(value: number) {
  const listObj = [];
  Object.keys(constants.STAGES).forEach( key => {listObj.push(key)});
  return listObj[value];
}

export function getName(object: Object, value: number) {
  const listObj = [];
  Object.keys(object).forEach( key => {listObj.push(key)});
  return listObj[value];
}
