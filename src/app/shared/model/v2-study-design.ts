import { version } from '../../../../package.json';
import {constants} from "./constants";

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
    statisticalTestList: {idx, type}[],
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
    this.statisticalTestList = [];
  }

  getSolveFor() {
    if (this.solutionTypeEnum === 'POWER') {
      return 'POWER';
    } else {
      return 'SAMPLESIZE';
    }
  }

  getTypeIErrorRates() {
    const l = [];
    if ( this.alphaList !== null
      && this.alphaList !== undefined
      && this.alphaList.length > 0) {
      this.alphalist.forEach( alpha => {
        l.push(alpha.alphaValue);
      });
    }
    return l;
  }

  getTests() {
    const tests = [];
    const v2tests = [];
    if (this.statisticalTestList !== null && this.statisticalTestList !== undefined) {
      for (let i = 0; i < this.statisticalTestList.length; i++) {
        // v2tests.push(this.statisticalTestList[i].type);
      }
    }
    if (v2tests.indexOf('HLT') !== -1) {
      tests.push(constants.STATISTICAL_TESTS.HOTELLING_LAWLEY);
    }
    if (v2tests.indexOf('PBT') !== -1) {
      tests.push(constants.STATISTICAL_TESTS.PILLAI_BARTLET);
    }
    if (v2tests.indexOf('WL') !== -1) {
      tests.push(constants.STATISTICAL_TESTS.WILKS_LIKLIEHOOD);
    }
    if (v2tests.indexOf('UNIREPBOX') !== -1) {
      tests.push(constants.STATISTICAL_TESTS.BOX_CORRECTION);
    }
    if (v2tests.indexOf('UNIREPGG') !== -1) {
      tests.push(constants.STATISTICAL_TESTS.GEISSER_GREENHOUSE);
    }
    if (v2tests.indexOf('UNIREPHF') !== -1) {
      tests.push(constants.STATISTICAL_TESTS.HUYNH_FELDT);
    }
    if (v2tests.indexOf('UNIREP') !== -1) {
      tests.push(constants.STATISTICAL_TESTS.UNCORRECTED);
    }
    if (v2tests.length === 0 ) {
      tests.push(constants.STATISTICAL_TESTS.HOTELLING_LAWLEY);
    }
    return tests;
  }
}
