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

// A representation of StudyDesign's data that can be converted to
// and from JSON without being altered.
interface StudyDesignJSON {
  _name: string;
  _targetEvent: string;
  _solveFor: string;
  _power: number[];
  _ciwidth: number;
  _selectedTests: string[];
  _typeOneErrorRate: Array<number>;
  _isuFactors: ISUFactors;
  _gaussianCovariate: GaussianCovariate;
  _scaleFactor: number[];
  _varianceScaleFactors: number[];
  _powerCurve: PowerCurve;
  _define_full_beta: boolean;
}

export class StudyDesign {
  private _name: string;
  private _targetEvent: string;
  private _solveFor: string;
  private _power: number[];
  private _ciwidth: number;
  private _selectedTests: string[];
  private _typeOneErrorRate: Array<number>;
  private _isuFactors: ISUFactors;
  private _gaussianCovariate: GaussianCovariate;
  private _scaleFactor: number[];
  private _varianceScaleFactors: number[];
  private _powerCurve: PowerCurve;
  private _define_full_beta: boolean;

  // fromJSON is used to convert an serialized version
  // of the StudyDesign to an instance of the class
  static fromJSON(json: StudyDesignJSON|string): StudyDesign {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, StudyDesign.reviver);
    } else {
      // create an instance of the StudyDesign class
      const study = Object.create(StudyDesign.prototype);
      // copy all the fields from the json object
      return Object.assign(study, json, {
        // convert fields that need converting
        _isuFactors: ISUFactors.fromJSON(JSON.stringify(json._isuFactors)),
        _gaussianCovariate: GaussianCovariate.fromJSON(JSON.stringify(json._gaussianCovariate)),
      });
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
              isuFactors?: ISUFactors,
              gaussianCovariates?: GaussianCovariate,
              hypothesisEffect?: HypothesisEffect,
              scaleFactor?: number,
              varianceScaleFactors?: number[],
              powerCurve?: PowerCurve
) {
    this.isuFactors = new ISUFactors();
    this.power = [];
    this._define_full_beta = false;
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
    let tableIds = [null];
    const factors = this.isuFactors.predictors;
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
        1
      ));
    });
    return tableIds;
  }

  generateGroupSizeTables() {
    const tables = Array<RelativeGroupSizeTable>();
    if (this.isuFactors.predictors.length > 0) {
      const tableIds = this._getRelativeGroupSizeTableIds();
      tableIds.forEach( tableId => {
        const table = new RelativeGroupSizeTable(tableId);
        table.populateTable(this.isuFactors.generateCombinations(this.isuFactors.predictors));
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
    this.isuFactors.predictors.forEach(predictor => {
      if (predictor.inHypothesis) {a = a * (predictor.valueNames.length - 1);
      }
    });
    return a;
  }

  get b() {
    let b = this.isuFactors.outcomes.length;
    const c = []
    this.isuFactors.repeatedMeasures.forEach(measure => {
      if (measure.inHypothesis) {
        c.push(measure.partialUMatrix.values.size()[1]);
      }
    });
    c.forEach(noCols => {
      b = b * noCols;
    });
    return b;
  }

  checkDependencies() {
    // Are factorName groups made up of predictors we have defined
    if (!isNullOrUndefined(this.isuFactors.predictors) &&
      this.isuFactors.predictors.length > 0) {
        const groups = this.relativeGroupSizes;
        const combinations = this.isuFactors.generateCombinations(this.isuFactors.predictors);
        if (groups.length !== combinations.length) {
          this.isuFactors.betweenIsuRelativeGroupSizes = this.generateGroupSizeTables();
        }
    } else if (isNullOrUndefined(this.isuFactors.betweenIsuRelativeGroupSizes) || this.isuFactors.predictors.length < 1) {
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
      }
    };

    // Are marginal means factorName groups made up of hypothesis we have chosen
    if (!isNullOrUndefined(this.isuFactors.hypothesis)) {
      this.isuFactors.marginalMeans = this.generateMarginalMeansTables();
    }

    if (this._isuFactors.theta0.length !== this.a || this._isuFactors.theta0[0].length !== this.b) {
      this._isuFactors.theta0 = this.generateDefaultTheta0();
    }
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
}
