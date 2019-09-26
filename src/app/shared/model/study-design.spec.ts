import {StudyDesign} from './study-design';

describe('StudyDesign', () => {
  let component: StudyDesign;

  beforeEach( () => { component = new StudyDesign(); });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load a v2 json save file correctly', () => {
    const jsonV2 = {
      'uuid': [],
      'name': null,
      'gaussianCovariate': true,
      'solutionTypeEnum': 'POWER',
      'participantLabel': 'ISU',
      'viewTypeEnum': 'GUIDED_MODE',
      'confidenceIntervalDescriptions': {
        'betaFixed': true,
        'sigmaFixed': false,
        'lowerTailProbability': 0.05,
        'upperTailProbability': 0,
        'sampleSize': 70,
        'rankOfDesignMatrix': 10
      },
      'powerCurveDescriptions': null,
      'alphaList': [
        {
          'idx': 0,
          'alphaValue': 0.01
        },
        {
          'idx': 1,
          'alphaValue': 0.05
        },
        {
          'idx': 2,
          'alphaValue': 0.1
        }
      ],
      'betaScaleList': [
        {
          'idx': 0,
          'value': 1
        },
        {
          'idx': 1,
          'value': 0.5
        },
        {
          'idx': 2,
          'value': 2
        }
      ],
      'sigmaScaleList': [
        {
          'idx': 0,
          'value': 1
        },
        {
          'idx': 1,
          'value': 0.5
        },
        {
          'idx': 2,
          'value': 3
        }
      ],
      'relativeGroupSizeList': [
        {
          'idx': 0,
          'value': '2'
        },
        {
          'idx': 0,
          'value': '3'
        }
      ],
      'sampleSizeList': [
        {
          'idx': 0,
          'value': 10
        },
        {
          'idx': 1,
          'value': 20
        },
        {
          'idx': 2,
          'value': 30
        }
      ],
      'statisticalTestList': [
        {
          'idx': '0',
          'type': 'HLT'
        },
        {
          'idx': '0',
          'type': 'PBT'
        },
        {
          'idx': '0',
          'type': 'WL'
        },
        {
          'idx': '0',
          'type': 'UNIREPBOX'
        },
        {
          'idx': '0',
          'type': 'UNIREPGG'
        },
        {
          'idx': '0',
          'type': 'UNIREPHF'
        },
        {
          'idx': '0',
          'type': 'UNIREP'
        }
      ],
      'powerMethodList': [
        {
          'idx': 0,
          'powerMethodEnum': 'QUANTILE'
        }
      ],
      'quantileList': [
        {
          'idx': 0,
          'value': 0.5
        },
        {
          'idx': 1,
          'value': 0.8
        }
      ],
      'nominalPowerList': [],
      'responseList': [
        {
          'idx': 0,
          'name': 'outcome1'
        },
        {
          'idx': 1,
          'name': 'outcome2'
        }
      ],
      'betweenParticipantFactorList': [
        {
          'idx': 0,
          'predictorName': 'betweenpredictor1',
          'categoryList': [
            {
              'idx': 0,
              'category': 'group1'
            },
            {
              'idx': 0,
              'category': 'group2'
            }
          ]
        }
      ],
      'repeatedMeasuresTree': [
        {
          'idx': 0,
          'node': 0,
          'parent': 0,
          'repeatedMeasuresDimensionType': 'CATEGORICAL',
          'numberOfMeasurements': 2,
          'spacingList': [
            {
              'idx': 1,
              'value': 1
            },
            {
              'idx': 2,
              'value': 2
            }
          ],
          'dimension': 'dimension1'
        },
        {
          'idx': 0,
          'node': 0,
          'parent': 0,
          'repeatedMeasuresDimensionType': 'NUMERICAL',
          'numberOfMeasurements': 3,
          'spacingList': [
            {
              'idx': 1,
              'value': 0
            },
            {
              'idx': 2,
              'value': 2
            },
            {
              'idx': 3,
              'value': 4
            }
          ],
          'dimension': 'dimension2'
        },
        {
          'idx': 0,
          'node': 0,
          'parent': 0,
          'repeatedMeasuresDimensionType': 'NUMERICAL',
          'numberOfMeasurements': 3,
          'spacingList': [
            {
              'idx': 1,
              'value': 1
            },
            {
              'idx': 2,
              'value': 3
            },
            {
              'idx': 3,
              'value': 7
            }
          ],
          'dimension': 'dimension3'
        }
      ],
      'clusteringTree': [
        {
          'idx': 0,
          'node': 0,
          'parent': 0,
          'groupName': 'clustering1',
          'groupSize': '2',
          'intraClusterCorrelation': -0.4
        },
        {
          'idx': 1,
          'node': 0,
          'parent': 0,
          'groupName': 'clustering2',
          'groupSize': '3',
          'intraClusterCorrelation': 0.6
        },
        {
          'idx': 2,
          'node': 0,
          'parent': 0,
          'groupName': 'clustering3',
          'groupSize': '4',
          'intraClusterCorrelation': 0.1
        }
      ],
      'hypothesis': [
        {
          'idx': 1,
          'type': 'INTERACTION',
          'betweenParticipantFactorMapList': [
            {
              'type': 'NONE',
              'betweenParticipantFactor': {
                'idx': 0,
                'predictorName': 'betweenpredictor1',
                'categoryList': [
                  {
                    'idx': 0,
                    'category': 'group1'
                  },
                  {
                    'idx': 0,
                    'category': 'group2'
                  }
                ]
              }
            }
          ],
          'repeatedMeasuresMapTree': [
            {
              'type': 'NONE',
              'repeatedMeasuresNode': {
                'idx': 0,
                'node': 0,
                'parent': 0,
                'repeatedMeasuresDimensionType': 'CATEGORICAL',
                'numberOfMeasurements': 2,
                'spacingList': [
                  {
                    'idx': 1,
                    'value': 1
                  },
                  {
                    'idx': 2,
                    'value': 2
                  }
                ],
                'dimension': 'dimension1'
              }
            },
            {
              'type': 'NONE',
              'repeatedMeasuresNode': {
                'idx': 0,
                'node': 0,
                'parent': 0,
                'repeatedMeasuresDimensionType': 'NUMERICAL',
                'numberOfMeasurements': 3,
                'spacingList': [
                  {
                    'idx': 1,
                    'value': 0
                  },
                  {
                    'idx': 2,
                    'value': 2
                  },
                  {
                    'idx': 3,
                    'value': 4
                  }
                ],
                'dimension': 'dimension2'
              }
            },
            {
              'type': 'NONE',
              'repeatedMeasuresNode': {
                'idx': 0,
                'node': 0,
                'parent': 0,
                'repeatedMeasuresDimensionType': 'NUMERICAL',
                'numberOfMeasurements': 3,
                'spacingList': [
                  {
                    'idx': 1,
                    'value': 1
                  },
                  {
                    'idx': 2,
                    'value': 3
                  },
                  {
                    'idx': 3,
                    'value': 7
                  }
                ],
                'dimension': 'dimension3'
              }
            }
          ]
        }
      ],
      'covariance': [
        {
          'idx': 0,
          'type': 'LEAR_CORRELATION',
          'name': 'dimension1',
          'standardDeviationList': [
            {
              'idx': 0,
              'value': 1
            },
            {
              'idx': 0,
              'value': 1
            }
          ],
          'rho': 0.9,
          'delta': 0.8,
          'scale': true,
          'rows': 2,
          'columns': 2,
          'blob': {
            'data': [
              [
                1,
                0.9
              ],
              [
                0.9,
                1
              ]
            ]
          }
        },
        {
          'idx': 0,
          'type': 'LEAR_CORRELATION',
          'name': 'dimension2',
          'standardDeviationList': [
            {
              'idx': 0,
              'value': 1
            },
            {
              'idx': 0,
              'value': 1
            },
            {
              'idx': 0,
              'value': 1
            }
          ],
          'rho': 0.7,
          'delta': 0.6,
          'scale': false,
          'rows': 3,
          'columns': 3,
          'blob': {
            'data': [
              [
                1,
                0.48999999999999994,
                0.39559874396917555
              ],
              [
                0.48999999999999994,
                1,
                0.48999999999999994
              ],
              [
                0.39559874396917555,
                0.48999999999999994,
                1
              ]
            ]
          }
        },
        {
          'idx': 0,
          'type': 'LEAR_CORRELATION',
          'name': 'dimension3',
          'standardDeviationList': [
            {
              'idx': 0,
              'value': 1
            },
            {
              'idx': 0,
              'value': 1
            },
            {
              'idx': 0,
              'value': 1
            }
          ],
          'rho': 0.5,
          'delta': 0.4,
          'scale': true,
          'rows': 3,
          'columns': 3,
          'blob': {
            'data': [
              [
                1,
                0.5,
                0.37892914162759955
              ],
              [
                0.5,
                1,
                0.43527528164806206
              ],
              [
                0.37892914162759955,
                0.43527528164806206,
                1
              ]
            ]
          }
        },
        {
          'idx': 0,
          'type': 'UNSTRUCTURED_COVARIANCE',
          'name': '__RESPONSE_COVARIANCE__',
          'standardDeviationList': [
            {
              'idx': 0,
              'value': 1
            },
            {
              'idx': 0,
              'value': 1
            }
          ],
          'rho': -2,
          'delta': -1,
          'scale': false,
          'rows': 2,
          'columns': 2,
          'blob': {
            'data': [
              [
                1,
                0.25
              ],
              [
                0.25,
                1
              ]
            ]
          }
        }
      ],
      'matrixSet': [
        {
          'idx': 0,
          'name': 'beta',
          'rows': 2,
          'columns': 36,
          'data': {
            'data': [
              [
                1,
                0,
                2,
                0,
                3,
                0,
                4,
                1,
                5,
                1,
                6,
                1,
                7,
                2,
                8,
                2,
                9,
                2,
                9,
                3,
                8,
                3,
                7,
                3,
                6,
                4,
                5,
                4,
                4,
                4,
                3,
                5,
                2,
                5,
                1,
                5
              ],
              [
                9,
                6,
                8,
                6,
                7,
                6,
                6,
                5,
                5,
                5,
                4,
                5,
                3,
                4,
                2,
                4,
                1,
                4,
                1,
                3,
                2,
                3,
                3,
                3,
                4,
                2,
                5,
                2,
                6,
                2,
                7,
                1,
                8,
                1,
                9,
                1
              ]
            ]
          }
        },
        {
          'idx': 0,
          'name': 'betaRandom',
          'rows': 1,
          'columns': 36,
          'data': {
            'data': [
              [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1
              ]
            ]
          }
        },
        {
          'idx': 0,
          'name': 'sigmaOutcomeGaussianRandom',
          'rows': 36,
          'columns': 1,
          'data': {
            'data': [
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ],
              [
                0.4
              ],
              [
                0.7
              ]
            ]
          }
        },
        {
          'idx': 0,
          'rows': 1,
          'columns': 1,
          'name': 'sigmaGaussianRandom',
          'data': {
            'data': [
              [
                3.4
              ]
            ]
          }
        }
      ]
    };
    const study = JSON.parse(str, StudyDesign.reviver);
    const a = 1;
  });

});
