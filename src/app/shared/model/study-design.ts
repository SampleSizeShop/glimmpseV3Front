import {ISUFactors} from './ISUFactors';
import * as math from 'mathjs';
import {GaussianCovariate} from './GaussianCovariate';
import {HypothesisEffect} from './HypothesisEffect';
import {isNullOrUndefined} from 'util';
import {ISUFactor} from './ISUFactor';
import {constants} from './constants';
import {PowerCurve} from './PowerCurve';
import {RelativeGroupSizeTable} from './RelativeGroupSizeTable';
import {MarginalMeansTable} from './MarginalMeansTable';
import {ISUFactorCombination} from './ISUFactorCombination';
import {CombinationId} from './CombinationId';
import {ConfidenceInterval} from './ConfidenceInterval';
import {StudyProgress} from './StudyProgress';
import { version } from '../../../../package.json';
import {V2StudyDesign} from './v2-study-design';

// A representation of StudyDesign's data that can be converted to
// and from JSON without being altered.
interface StudyDesignJSON {
  _glimmpse_ui_version: string;
  _name: string;
  _targetEvent: string;
  _solveFor: string;
  _power: number[];
  _ciwidth: number;
  _selectedTests: string[];
  _typeOneErrorRate: Array<number>;
  _isuFactors: ISUFactors;
  _gaussianCovariate: GaussianCovariate;
  _quantiles: Set<number>;
  _scaleFactor: number[];
  _varianceScaleFactors: number[];
  _powerCurve: PowerCurve;
  _define_full_beta: boolean;
  _confidence_interval: ConfidenceInterval;
  _progress: StudyProgress;
  _stageReached: number;
}

export class StudyDesign {
  // private _glimmpse_ui_version: string = version;
  private _name: string;
  private _targetEvent: string;
  private _solveFor: string;
  private _power: number[];
  private _ciwidth: number;
  private _selectedTests: string[];
  private _typeOneErrorRate: Array<number>;
  private _quantiles: Array<number>;
  private _isuFactors: ISUFactors;
  private _gaussianCovariate: GaussianCovariate;
  private _scaleFactor: number[];
  private _varianceScaleFactors: number[];
  private _powerCurve: PowerCurve;
  private _define_full_beta: boolean;
  private _confidence_interval: ConfidenceInterval;
  private _progress: StudyProgress;
  private _stageReached: number;
  private _currentStage: number;


  // fromJSON is used to convert an serialized version
  // of the StudyDesign to an instance of the class
  static fromJSON(json: StudyDesignJSON|string): StudyDesign {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, StudyDesign.reviver);
    } else {
      // create an instance of the StudyDesign class
      const study = Object.create(StudyDesign.prototype);
      if (Object.keys(json).indexOf('uuid') !== -1 ) {
        alert('You have loaded a study design from GLIMMPSE version 2.');
        const v2study = Object.create(V2StudyDesign.prototype);
        Object.assign(v2study, json);
        study._progress = new StudyProgress();
        study._name = 'converted from GLIMMPSE V2';
        study._define_full_beta = true;
        study._solveFor = v2study.getSolveFor();
        study._power =  v2study.getPowers();
        study._selectedTests = v2study.getTests();
        study._typeOneErrorRate = v2study.getTypeIErrorRates();
        study._quantiles = v2study.getQuantiles();
        study._gaussianCovariate = v2study.getGaussianCovariate();
        study._scaleFactor = v2study.getScaleFactors();
        study._varianceScaleFactors = v2study.getVarianceScaleFactors();
        study._isuFactors = v2study.getIsuFactors();
        study._confidence_interval = null;
      } else {
        // copy all the fields from the json object
        Object.assign(study, json, {
          // convert fields that need converting
          _isuFactors: ISUFactors.fromJSON(JSON.stringify(json._isuFactors)),
          _gaussianCovariate: GaussianCovariate.fromJSON(JSON.stringify(json._gaussianCovariate)),
          _confidence_interval: ConfidenceInterval.fromJSON(JSON.stringify(json._confidence_interval)),
        });
      }
      return study;
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call ISUFactors.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? StudyDesign.fromJSON(value) : value;
  }

  constructor(name?: string,
              guided?: boolean,
              targetEvent?: string,
              solveFor?: string,
              power?: number[],
              ciwidth?: number,
              selectedTests?: Set<string>,
              typeOneErrorRate?: number,
              quantiles?: Array<number>,
              isuFactors?: ISUFactors,
              gaussianCovariates?: GaussianCovariate,
              hypothesisEffect?: HypothesisEffect,
              scaleFactor?: number,
              varianceScaleFactors?: number[],
              powerCurve?: PowerCurve,
              confidence_interval?: ConfidenceInterval,
              stageReached?: number,
              currentStage?: number
) {
    this.stageReached = 0;
    this.currentStage = 0;
    this.isuFactors = new ISUFactors();
    this.power = [];
    this._define_full_beta = false;
    this._progress = new StudyProgress();
  }

  get relativeGroupSizes() {
    const groups = [];
    this.isuFactors.betweenIsuRelativeGroupSizes.forEach( relativeGroupSizeTable => {
      relativeGroupSizeTable.table.forEach( row => {
        row.forEach(group => {
          groups.push(group);
        });
      });
    });
    return groups;
  }

  _getRelativeGroupSizeTableIds() {
    let factors = this.isuFactors.predictorsInHypothesis;
    if (this.define_full_beta) {
      factors = this.isuFactors.predictors;
    }
    let tableIds = [null];
    factors.shift();
    factors.shift();
    if (factors.length > 0) {
      tableIds = this.isuFactors.generateCombinations(factors);
    }
    return tableIds;
  }

  _getMarginalMeansTableIds() {
    const tableIds = [];
    this.isuFactors.outcomes.forEach( outcome => {
      tableIds.push(new ISUFactorCombination(
        [
          new CombinationId(
            outcome.name,
            constants.HYPOTHESIS_ORIGIN.OUTCOME,
          '',
          0
          )],
        null
      ));
    });
    return tableIds;
  }

  generateGroupSizeTables() {
    const tables = Array<RelativeGroupSizeTable>();
    let factors = this.isuFactors.predictorsInHypothesis;
    if (this.define_full_beta) {
      factors = this.isuFactors.predictors;
    }
    if (factors.length > 0) {
      const tableIds = this._getRelativeGroupSizeTableIds();
      tableIds.forEach( tableId => {
        const table = new RelativeGroupSizeTable(tableId);
        table.populateTable(this.isuFactors.generateCombinations(factors));
        let pushed = false;
        this.isuFactors.betweenIsuRelativeGroupSizes.forEach( existingTable => {
          if (existingTable.compareSizeAndDimensions(table)) {
            tables.push(existingTable);
            pushed = true;
          }
        });
        if (!pushed) {
          tables.push(table);
        }
      });
    } else {
      const interceptId = new CombinationId('Intercept', 'Intercept' ,  'Intercept');
      const intercept = new ISUFactorCombination([interceptId]);
      // console.log('Generating intercept')
      const interceptTable = new RelativeGroupSizeTable(intercept, [[intercept]]);
      interceptTable.dimensions = [interceptId];
      tables.push(interceptTable);
    }
    return tables;
  }

  generateMarginalMeansTables() {
    const tables = Array<MarginalMeansTable>();

    const tableIds = this._getMarginalMeansTableIds();
    tableIds.forEach( tableId => {
      const table = new MarginalMeansTable(tableId);
      table.populateTable(this.isuFactors, this._define_full_beta);
      let pushed = false;
      this.isuFactors.marginalMeans.forEach( existingTable => {
        if (existingTable.compareSizeAndDimensions(table)) {
          tables.push(existingTable);
          pushed = true;
        }
      });
      if (!pushed) {
        tables.push(table);
      }
    });
    return tables;
  }

  generateDefaultTheta0() {
    const theta0Array = [];
    for (let i = 0; i < this.a; i++) {
      theta0Array.push(this.theta0DefaultRow);
    }
    return theta0Array
  }

  get theta0DefaultRow(): Array<number> {
    const row = [];
    for (let i = 0; i < this.b; i++) {
      row.push(0);
    }
    return row;
  }

  get a() {
    let a = 1;
    let predictors = this._isuFactors.predictorsInHypothesis;
    if (this.define_full_beta) {
      predictors = this._isuFactors.predictors;
    }
    if (this._isuFactors.cMatrix.type === constants.CONTRAST_MATRIX_NATURE.USER_DEFINED_PARTIALS) {
      predictors.forEach(predictor => {
        let n = 1;
        if (predictor.inHypothesis &&
          predictor.isuFactorNature === constants.CONTRAST_MATRIX_NATURE.GLOBAL_TRENDS) {
          n = predictor.valueNames.length - 1;
        } else if (predictor.inHypothesis && predictor.isuFactorNature === constants.CONTRAST_MATRIX_NATURE.POLYNOMIAL) {
          n = predictor.polynomialOrder - 1;
        } else if (predictor.inHypothesis &&
          predictor.isuFactorNature === constants.CONTRAST_MATRIX_NATURE.IDENTITY) {
          n = predictor.valueNames.length
        } else if (predictor.inHypothesis &&
          predictor.isuFactorNature === constants.CONTRAST_MATRIX_NATURE.CUSTOM_C_MATRIX) {
          n = predictor.partialMatrix.values.size()[0]
        }
        a = a * n
      });
    } else if (this._isuFactors.cMatrix.type === constants.CONTRAST_MATRIX_NATURE.CUSTOM_C_MATRIX
    && predictors.length > 0) {
      a = this._isuFactors.cMatrix.values.size()[0]
    } else if (this._isuFactors.cMatrix.type === constants.CONTRAST_MATRIX_NATURE.CUSTOM_C_MATRIX
    && predictors.length === 0) {
      a = 1;
    } else if (this._isuFactors.cMatrix.type === constants.CONTRAST_MATRIX_NATURE.IDENTITY) {
      predictors.forEach(predictor => {
          a = a * predictor.valueNames.length;
      });
    } else {
      predictors.forEach(predictor => {
        if (predictor.inHypothesis) {a = a * (predictor.valueNames.length - 1);
        }
      });
    }
    return a;
  }

  get b() {
    let b = this._isuFactors.outcomes.length;

    let measures = this._isuFactors.repeatedMeasuresInHypothesis;
    if (this.define_full_beta) {
      measures = this._isuFactors.repeatedMeasures;
    }
    if (this._isuFactors.uMatrix.type === constants.CONTRAST_MATRIX_NATURE.USER_DEFINED_PARTIALS) {
      measures.forEach(repeatedMeasure => {
        let n = 1;
        if (repeatedMeasure.inHypothesis &&
          repeatedMeasure.isuFactorNature === constants.CONTRAST_MATRIX_NATURE.GLOBAL_TRENDS) {
          n = repeatedMeasure.valueNames.length - 1;
        } else if (repeatedMeasure.inHypothesis &&
          repeatedMeasure.isuFactorNature === constants.CONTRAST_MATRIX_NATURE.IDENTITY) {
          n = repeatedMeasure.valueNames.length
        } else if (repeatedMeasure.inHypothesis &&
          repeatedMeasure.isuFactorNature === constants.CONTRAST_MATRIX_NATURE.POLYNOMIAL) {
          n = repeatedMeasure.polynomialOrder - 1;
        } else if (repeatedMeasure.inHypothesis &&
          repeatedMeasure.isuFactorNature === constants.CONTRAST_MATRIX_NATURE.CUSTOM_U_MATRIX) {
          n = repeatedMeasure.partialMatrix.values.size()[1]
        }
        b = b * n
      });
    } else if (this._isuFactors.uMatrix.type === constants.CONTRAST_MATRIX_NATURE.CUSTOM_U_MATRIX
                && measures.length > 0) {
      b = this._isuFactors.uMatrix.values.size()[1];
    } else if (this._isuFactors.uMatrix.type === constants.CONTRAST_MATRIX_NATURE.CUSTOM_U_MATRIX
                && measures.length === 0) {
      b = 1;
    } else if (this._isuFactors.uMatrix.type === constants.CONTRAST_MATRIX_NATURE.IDENTITY) {
      measures.forEach(repeatedMeasure => {
        const n = repeatedMeasure.valueNames.length;
        b = b * n;
      });
    } else {
      const c = []
      measures.forEach(measure => {
        if (measure.inHypothesis) {
          c.push(measure.partialUMatrix.values.size()[1]);
        }
      });
      c.forEach(noCols => {
        b = b * noCols;
      });
    }
    return b;
  }


  updateStageReached() {
    this.stageReached = this.currentStage;
  }

  checkDependencies() {
    // do not allow gaussian covariates or confidence intervals when solving for samplesize
    if (this.solveFor === constants.SOLVE_FOR.SAMPLE_SIZE) {
      this.gaussianCovariate = null;
      this.confidence_interval = null;
      this.updateStageReached();
    }

    // Are factorName groups made up of predictors we have defined
    if ((this.isuFactors.predictors !== null && this.isuFactors.predictors !== undefined) &&
      this.isuFactors.predictors.length > 0) {
        const groups = this.relativeGroupSizes;
        let factors = this.isuFactors.predictorsInHypothesis;
        if (this.define_full_beta) {
          factors = this.isuFactors.predictors
        }
        const combinations = this.isuFactors.generateCombinations(factors);
        if (groups.length !== combinations.length) {
          this.isuFactors.betweenIsuRelativeGroupSizes = this.generateGroupSizeTables();
          this.updateStageReached();
        }
    } else if (
      (this.isuFactors.betweenIsuRelativeGroupSizes === null || this.isuFactors.betweenIsuRelativeGroupSizes === undefined)
      || this.isuFactors.predictors.length < 1) {
      this.isuFactors.betweenIsuRelativeGroupSizes = this.generateGroupSizeTables()
    }

    // is our hypothesis effect made up of isuFactors we have defined
    if (!isNullOrUndefined(this.isuFactors.hypothesis)) {
      let possibleEffect = true;
      const variables = this.variables;
      if (!isNullOrUndefined(variables) && !isNullOrUndefined(this.isuFactors.hypothesis)) {
        this.isuFactors.hypothesis.forEach(variable => {
          let match = false;
          variables.forEach(
            value => {
              if (!match) {
                match = value.compare(variable);
              }
            }
          );
          if (!match ) {
            possibleEffect = false;
          }
        });
      }
      if (!possibleEffect) {
        this.isuFactors.clearHypothesis();
        this.updateStageReached();
      }
    };

    // is our outcome correlation matrix of the correct dimension? this should only happen when a user remopves an
    // outcome such that we are back down to one
    if (
      (this.isuFactors.outcomeCorrelationMatrix !== null && this.isuFactors.outcomeCorrelationMatrix !== undefined)
      && this.isuFactors.outcomeCorrelationMatrix.values.size()[0] !== this.isuFactors.outcomes.length
    ) {
      this.isuFactors.outcomeCorrelationMatrix.names = [];
      this.isuFactors.outcomes.forEach( outcome => {
        this.isuFactors.outcomeCorrelationMatrix.names.push(outcome.name)
      });
      this.isuFactors.outcomeCorrelationMatrix.values = math.matrix([[1]]);
      this.updateStageReached();
    }

    // Is theta nought of the correct dimension?
    if ((this._isuFactors.theta0.length !== this.a || this._isuFactors.theta0[0].length !== this.b)
      && this.generateDefaultTheta0().length !== 0 ) {
      this._isuFactors.theta0 = this.generateDefaultTheta0();
      this.updateStageReached();
    }

    // Are marginal means factorName groups made up of hypothesis we have chosen
    if (this.isuFactors.hypothesis !== null && this.isuFactors.hypothesis !== undefined) {
      this.isuFactors.marginalMeans = this.generateMarginalMeansTables();
      this.updateStageReached();
    }

    // update study progress - this must always be the last stage of check dependencies.
    this.updateProgress();
  }

  updateProgress() {
    let design = false;
    let hypothesis = false;
    let dimensions = false;
    let parameters = false;
    let optional = false;
    if (
      this.stageReached > 8
      && this._typeOneErrorRate.length > 0
      && (this._solveFor === constants.SOLVE_FOR.POWER || this._power.length > 0)
      && this._selectedTests.length > 0
      && this.isuFactors.outcomes.length > 0
    ) {
      design = true;
    }
    if (this.stageReached > 12 && design) {
      hypothesis = true;
    }
    if (this.stageReached > 15
      && hypothesis
      && (this.solveFor === constants.SOLVE_FOR_POWER && this.isuFactors.smallestGroupSize.length > 0
          || this.solveFor === constants.SOLVE_FOR_SAMPLESIZE)
    ) {
      dimensions = true;
    }
    if (this.stageReached > 25
      && dimensions) {
      parameters = true;
    }
    if (this.stageReached > 26
      && parameters) {
      optional = true;
    }
    if (this.stageReached > 27
      && optional) {
    }
    this._progress = new StudyProgress(design, hypothesis, dimensions, parameters, optional);
  }

  get variables() {
    const variables = [];
    this.isuFactors.outcomes.forEach(outcome => {
      const variable = new ISUFactor(
        outcome.name,
        outcome.nature,
        outcome.origin);
      variables.push(variable);
    });
    this.isuFactors.repeatedMeasures.forEach(repeatedMeasure => {
      const variable = new ISUFactor(
        repeatedMeasure.name,
        constants.HYPOTHESIS_NATURE.WITHIN,
        constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE);
      variables.push(variable);
    });
    if (!isNullOrUndefined(this.isuFactors) && !isNullOrUndefined(this.isuFactors.predictors)) {
      this.isuFactors.predictors.forEach(predictor => {
        const variable = new ISUFactor(
          predictor.name,
          constants.HYPOTHESIS_NATURE.BETWEEN,
          constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR);
        variables.push(variable);
      });
    }

    if (!isNullOrUndefined(this.gaussianCovariate) && !isNullOrUndefined(this.gaussianCovariate.corellations)) {
      const corellations = []
      const input = []
      this.isuFactors.outcomes.forEach( outcome => {
        input.push(outcome);
      });
      this.isuFactors.repeatedMeasuresInHypothesis.forEach( measure => {
        input.push(measure);
      });
      const a  = this.isuFactors.generateCombinations(input);
      this.isuFactors.outcomes.forEach(outcome => {
        if (!isNullOrUndefined(this.isuFactors.repeatedMeasures) && this.isuFactors.repeatedMeasuresInHypothesis.length > 0) {
          this.isuFactors.repeatedMeasuresInHypothesis.forEach(measure => {
            measure.valueNames.forEach(val => {
              const name = outcome.name + ', ' + measure.name + ' ' + +val;
              corellations.push(name);
            });
          });
        } else {
          const name = outcome.name;
          corellations.push(name);
        }
      });
      if (corellations.length !== this.gaussianCovariate.corellations.length) {
        this.gaussianCovariate.corellations = null;
      }
    }
    return variables;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get targetEvent(): string {
    return this._targetEvent;
  }

  set targetEvent(value: string) {
    this._targetEvent = value;
  }

  get solveFor(): string {
    return this._solveFor;
  }

  set solveFor(value: string) {
    this._solveFor = value;
  }

  get power(): number[] {
    return this._power;
  }

  set power(value: number[]) {
    this._power = value;
  }

  get ciwidth(): number {
    return this._ciwidth;
  }

  set ciwidth(value: number) {
    this._ciwidth = value;
  }

  get selectedTests(): string[] {
    return this._selectedTests;
  }

  set selectedTests(value: string[]) {
    this._selectedTests = value;
  }

  get typeOneErrorRate(): Array<number> {
    return this._typeOneErrorRate;
  }

  set typeOneErrorRate(value: Array<number>) {
    this._typeOneErrorRate = value;
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get gaussianCovariate(): GaussianCovariate {
    return this._gaussianCovariate;
  }

  set gaussianCovariate(value: GaussianCovariate) {
    this._gaussianCovariate = value;
  }

  get scaleFactor(): Array<number> {
    return this._scaleFactor;
  }

  set scaleFactor(value: Array<number>) {
    this._scaleFactor = value;
  }

  get varianceScaleFactors(): number[] {
    return this._varianceScaleFactors;
  }

  set varianceScaleFactors(value: number[]) {
    this._varianceScaleFactors = value;
  }

  get powerCurve(): PowerCurve {
    return this._powerCurve;
  }

  set powerCurve(value: PowerCurve) {
    this._powerCurve = value;
  }

  get define_full_beta(): boolean {
    return this._define_full_beta;
  }

  set define_full_beta(value: boolean) {
    this._define_full_beta = value;
  }

  get quantiles(): Array<number> {
    return this._quantiles;
  }

  set quantiles(value: Array<number>) {
    this._quantiles = value;
  }

  get confidence_interval(): ConfidenceInterval {
    return this._confidence_interval;
  }

  set confidence_interval(value: ConfidenceInterval) {
    this._confidence_interval = value;
  }

  get progress(): StudyProgress {
    return this._progress;
  }

  set progress(value: StudyProgress) {
    this._progress = value;
  }

  get stageReached(): number {
    return this._stageReached;
  }

  set stageReached(value: number) {
    this._stageReached = value;
  }

  get currentStage(): number {
    return this._currentStage;
  }

  set currentStage(value: number) {
    this._currentStage = value;
  }
}
