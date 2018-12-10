export const testCombinationMap1 = {
    '_isuFactors':    {
      'variables':    [
        {
          'valueNames':    [
            '1',
            '2'
          ],
          'inHypothesis':    true,
          'isuFactorNature':    'Global Trends',
          'nature':    'Between',
          'origin':    'Between ISU Predictor',
          'name':    'p1',
          'type':    'ORDINAL',
          'units':    '',
          'child':    null
        },
        {
          'valueNames':    [

          ],
          'name':    '1',
          'inHypothesis':    false,
          'isuFactorNature':    'Global Trends',
          'nature':    'Within',
          'origin':    'Outcome',
          'standardDeviation':    1
        }
      ],
      'betweenIsuRelativeGroupSizes':    [
        {
          '_tableId':    null,
          'dimensions':    [
            {
              'order':    0,
              'factorName':    'p1',
              'factorType':    'Between ISU Predictor',
              'value':    '1'
            }
          ],
          '_table':    [
            [
              {
                'value':    1,
                'id':    [
                  {
                    'order':    0,
                    'factorName':    'p1',
                    'factorType':    'Between ISU Predictor',
                    'value':    '1'
                  }
                ]
              }
            ],
            [
              {
                'value':    3,
                'id':    [
                  {
                    'order':    1,
                    'factorName':    'p1',
                    'factorType':    'Between ISU Predictor',
                    'value':    '2'
                  }
                ]
              }
            ]
          ]
        }
      ],
      'marginalMeans':    [
        {
          '_tableId':    {
            'value':    1,
            'id':    [
              {
                'order':    0,
                'factorName':    '1',
                'factorType':    'Outcome',
                'value':    ''
              }
            ]
          },
          '_table':    [
            [
              {
                'value':    1,
                'id':    [
                  {
                    'order':    0,
                    'factorName':    '1',
                    'factorType':    'Outcome',
                    'value':    ''
                  },
                  {
                    'order':    0,
                    'factorName':    'p1',
                    'factorType':    'Between ISU Predictor',
                    'value':    '1'
                  }
                ]
              }
            ],
            [
              {
                'value':    1,
                'id':    [
                  {
                    'order':    0,
                    'factorName':    '1',
                    'factorType':    'Outcome',
                    'value':    ''
                  },
                  {
                    'order':    1,
                    'factorName':    'p1',
                    'factorType':    'Between ISU Predictor',
                    'value':    '2'
                  }
                ]
              }
            ]
          ]
        }
      ],
      'smallestGroupSize':    3,
      'theta0':    [
        [
          0
        ]
      ],
      'outcomeCorrelationMatrix':    {
        '_values':    {
          'mathjs':    'DenseMatrix',
          'data':    [
            [
              1
            ]
          ],
          'size':    [
            1,
            1
          ]
        }
      },
      'cMatrix':    {
        'name':    '',
        'logger':    null,
        '_values':    {
          'mathjs':    'DenseMatrix',
          'data':    [

          ],
          'size':    [
            0
          ]
        },
        '_type':    'Global Trends'
      },
      'uMatrix':    {
        'name':    '',
        'logger':    null,
        '_values':    {
          'mathjs':    'DenseMatrix',
          'data':    [

          ],
          'size':    [
            0
          ]
        },
        '_type':    'Global Trends'
      }
    },
    '_define_full_beta':    false,
    '_name':    'New Study',
    '_targetEvent':    'REJECTION',
    '_solveFor':    'POWER',
    '_ciwidth':    1,
    '_power':    0.5,
    '_selectedTests':    [
      'Hotelling Lawley Trace'
    ],
    '_typeOneErrorRate':    0.01,
    '_gaussianCovariate':    null,
    '_scaleFactor':    1,
    '_varianceScaleFactors':    [
      1
    ],
    '_powerCurve':    null
};

export const testCombinationMap2 = {
  '_isuFactors': {
    'variables': [
      {
        'valueNames': [
          '1',
          '2'
        ],
        'inHypothesis': true,
        'isuFactorNature': 'Global Trends',
        'nature': 'Between',
        'origin': 'Between ISU Predictor',
        'name': 'p1',
        'type': 'ORDINAL',
        'units': '',
        'child': {
          'valueNames': [
            '3',
            '4',
            '5'
          ],
          'inHypothesis': true,
          'isuFactorNature': 'Global Trends',
          'nature': 'Between',
          'origin': 'Between ISU Predictor',
          'name': 'p2',
          'type': 'ORDINAL',
          'units': '',
          'child': null
        }
      },
      {
        'valueNames': [
          '3',
          '4',
          '5'
        ],
        'inHypothesis': true,
        'isuFactorNature': 'Global Trends',
        'nature': 'Between',
        'origin': 'Between ISU Predictor',
        'name': 'p2',
        'type': 'ORDINAL',
        'units': '',
        'child': null
      },
      {
        'valueNames': [

        ],
        'name': '1',
        'inHypothesis': false,
        'isuFactorNature': 'Global Trends',
        'nature': 'Within',
        'origin': 'Outcome',
        'standardDeviation': 1
      }
    ],
    'betweenIsuRelativeGroupSizes': [
      {
        '_tableId': null,
        'dimensions': [
          {
            'order': 0,
            'factorName': 'p1',
            'factorType': 'Between ISU Predictor',
            'value': '1'
          },
          {
            'order': 0,
            'factorName': 'p2',
            'factorType': 'Between ISU Predictor',
            'value': '3'
          }
        ],
        '_table': [
          [
            {
              'value': 1,
              'id': [
                {
                  'order': 0,
                  'factorName': 'p1',
                  'factorType': 'Between ISU Predictor',
                  'value': '1'
                },
                {
                  'order': 0,
                  'factorName': 'p2',
                  'factorType': 'Between ISU Predictor',
                  'value': '3'
                }
              ]
            },
            {
              'value': 3,
              'id': [
                {
                  'order': 0,
                  'factorName': 'p1',
                  'factorType': 'Between ISU Predictor',
                  'value': '1'
                },
                {
                  'order': 1,
                  'factorName': 'p2',
                  'factorType': 'Between ISU Predictor',
                  'value': '4'
                }
              ]
            },
            {
              'value': 5,
              'id': [
                {
                  'order': 0,
                  'factorName': 'p1',
                  'factorType': 'Between ISU Predictor',
                  'value': '1'
                },
                {
                  'order': 2,
                  'factorName': 'p2',
                  'factorType': 'Between ISU Predictor',
                  'value': '5'
                }
              ]
            }
          ],
          [
            {
              'value': 11,
              'id': [
                {
                  'order': 1,
                  'factorName': 'p1',
                  'factorType': 'Between ISU Predictor',
                  'value': '2'
                },
                {
                  'order': 0,
                  'factorName': 'p2',
                  'factorType': 'Between ISU Predictor',
                  'value': '3'
                }
              ]
            },
            {
              'value': 9,
              'id': [
                {
                  'order': 1,
                  'factorName': 'p1',
                  'factorType': 'Between ISU Predictor',
                  'value': '2'
                },
                {
                  'order': 1,
                  'factorName': 'p2',
                  'factorType': 'Between ISU Predictor',
                  'value': '4'
                }
              ]
            },
            {
              'value': 7,
              'id': [
                {
                  'order': 1,
                  'factorName': 'p1',
                  'factorType': 'Between ISU Predictor',
                  'value': '2'
                },
                {
                  'order': 2,
                  'factorName': 'p2',
                  'factorType': 'Between ISU Predictor',
                  'value': '5'
                }
              ]
            }
          ]
        ]
      }
    ],
    'marginalMeans': [
      {
        '_tableId': {
          'value': 1,
          'id': [
            {
              'order': 0,
              'factorName': '1',
              'factorType': 'Outcome',
              'value': ''
            }
          ]
        },
        '_table': [
          [
            {
              'value': 1,
              'id': [
                {
                  'order': 0,
                  'factorName': '1',
                  'factorType': 'Outcome',
                  'value': ''
                },
                {
                  'order': 0,
                  'factorName': 'p1',
                  'factorType': 'Between ISU Predictor',
                  'value': '1'
                },
                {
                  'order': 0,
                  'factorName': 'p2',
                  'factorType': 'Between ISU Predictor',
                  'value': '3'
                }
              ]
            }
          ],
          [
            {
              'value': 1,
              'id': [
                {
                  'order': 0,
                  'factorName': '1',
                  'factorType': 'Outcome',
                  'value': ''
                },
                {
                  'order': 0,
                  'factorName': 'p1',
                  'factorType': 'Between ISU Predictor',
                  'value': '1'
                },
                {
                  'order': 1,
                  'factorName': 'p2',
                  'factorType': 'Between ISU Predictor',
                  'value': '4'
                }
              ]
            }
          ],
          [
            {
              'value': 1,
              'id': [
                {
                  'order': 0,
                  'factorName': '1',
                  'factorType': 'Outcome',
                  'value': ''
                },
                {
                  'order': 0,
                  'factorName': 'p1',
                  'factorType': 'Between ISU Predictor',
                  'value': '1'
                },
                {
                  'order': 2,
                  'factorName': 'p2',
                  'factorType': 'Between ISU Predictor',
                  'value': '5'
                }
              ]
            }
          ],
          [
            {
              'value': 1,
              'id': [
                {
                  'order': 0,
                  'factorName': '1',
                  'factorType': 'Outcome',
                  'value': ''
                },
                {
                  'order': 1,
                  'factorName': 'p1',
                  'factorType': 'Between ISU Predictor',
                  'value': '2'
                },
                {
                  'order': 0,
                  'factorName': 'p2',
                  'factorType': 'Between ISU Predictor',
                  'value': '3'
                }
              ]
            }
          ],
          [
            {
              'value': 1,
              'id': [
                {
                  'order': 0,
                  'factorName': '1',
                  'factorType': 'Outcome',
                  'value': ''
                },
                {
                  'order': 1,
                  'factorName': 'p1',
                  'factorType': 'Between ISU Predictor',
                  'value': '2'
                },
                {
                  'order': 1,
                  'factorName': 'p2',
                  'factorType': 'Between ISU Predictor',
                  'value': '4'
                }
              ]
            }
          ],
          [
            {
              'value': 1,
              'id': [
                {
                  'order': 0,
                  'factorName': '1',
                  'factorType': 'Outcome',
                  'value': ''
                },
                {
                  'order': 1,
                  'factorName': 'p1',
                  'factorType': 'Between ISU Predictor',
                  'value': '2'
                },
                {
                  'order': 2,
                  'factorName': 'p2',
                  'factorType': 'Between ISU Predictor',
                  'value': '5'
                }
              ]
            }
          ]
        ]
      }
    ],
    'smallestGroupSize': 3,
    'theta0': [
      [
        0
      ],
      [
        0
      ]
    ],
    'outcomeCorrelationMatrix': {
      '_values': {
        'mathjs': 'DenseMatrix',
        'data': [
          [
            1
          ]
        ],
        'size': [
          1,
          1
        ]
      }
    },
    'cMatrix': {
      'name': '',
      'logger': null,
      '_values': {
        'mathjs': 'DenseMatrix',
        'data': [

        ],
        'size': [
          0
        ]
      },
      '_type': 'Global Trends'
    },
    'uMatrix': {
      'name': '',
      'logger': null,
      '_values': {
        'mathjs': 'DenseMatrix',
        'data': [

        ],
        'size': [
          0
        ]
      },
      '_type': 'Global Trends'
    }
  },
  '_define_full_beta': false,
  '_name': 'New Study',
  '_targetEvent': 'REJECTION',
  '_solveFor': 'POWER',
  '_ciwidth': 1,
  '_power': 0.5,
  '_selectedTests': [
    'Hotelling Lawley Trace'
  ],
  '_typeOneErrorRate': 0.01,
  '_gaussianCovariate': null,
  '_scaleFactor': 1,
  '_varianceScaleFactors': [
    1
  ],
  '_powerCurve': null
};
