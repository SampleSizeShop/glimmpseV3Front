import { version } from '../../../../package.json';

// A representation of StudyDesign's data that can be converted to
// and from JSON without being altered.
interface V2StudyDesignJSON {
  uuid: [];
  name: null;
  gaussianCovariate: boolean;
  solutionTypeEnum: null;
  participantLabel: null;
  viewTypeEnum: null;
  confidenceIntervalDescriptions: null;
  powerCurveDescriptions: null;
  alphaList: [];
  betaScaleList: [];
  sigmaScaleList: [];
  relativeGroupSizeList: [];
  sampleSizeList: [];
  statisticalTestList: [];
  powerMethodList: [];
  quantileList: [];
  nominalPowerList: [];
  responseList: [];
  betweenParticipantFactorList: [];
  repeatedMeasuresTree: [];
  clusteringTree: [];
  hypothesis: [];
  covariance: [];
  matrixSet: [];
}

export class V2StudyDesign {
  uuid: [];
  name: null;
  gaussianCovariate: boolean;
  solutionTypeEnum: null;
  participantLabel: null;
  viewTypeEnum: null;
  confidenceIntervalDescriptions: null;
  powerCurveDescriptions: null;
  alphaList: [];
  betaScaleList: [];
  sigmaScaleList: [];
  relativeGroupSizeList: [];
  sampleSizeList: [];
  statisticalTestList: [];
  powerMethodList: [];
  quantileList: [];
  nominalPowerList: [];
  responseList: [];
  betweenParticipantFactorList: [];
  repeatedMeasuresTree: [];
  clusteringTree: [];
  hypothesis: [];
  covariance: [];
  matrixSet: [];

  // fromJSON is used to convert an serialized version
  // of the StudyDesign to an instance of the class
  static fromJSON(json: V2StudyDesignJSON|string): V2StudyDesign {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, V2StudyDesign.reviver);
    } else {
      // create an instance of the StudyDesign class
      const study = Object.create(V2StudyDesign.prototype);
      // copy all the fields from the json object
      return Object.assign(study, json, {
        // convert fields that need converting
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call ISUFactors.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? V2StudyDesign.fromJSON(value) : value;
  }

  constructor(
    uuid: [],
    name: null,
    gaussianCovariate: true,
    solutionTypeEnum: null,
    participantLabel: null,
    viewTypeEnum: null,
    confidenceIntervalDescriptions: null,
    powerCurveDescriptions: null,
    alphaList: [],
    betaScaleList: [],
    sigmaScaleList: [],
    relativeGroupSizeList: [],
    sampleSizeList: [],
    statisticalTestList: [],
    powerMethodList: [],
    quantileList: [],
    nominalPowerList: [],
    responseList: [],
    betweenParticipantFactorList: [],
    repeatedMeasuresTree: [],
    clusteringTree: [],
    hypothesis: [],
    covariance: [],
    matrixSet: []
  ) {
    // do something?
  }
}
