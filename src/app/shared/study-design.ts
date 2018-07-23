import {ISUFactors} from './ISUFactors';
import {GaussianCovariate} from './GaussianCovariate';
import {HypothesisEffect} from './HypothesisEffect';
import {isNullOrUndefined} from 'util';
import {ISUFactor} from './ISUFactor';
import {constants} from './constants';
import {PowerCurve} from './PowerCurve';
import {RelativeGroupSizeTable} from "./RelativeGroupSizeTable";

export class StudyDesign {
  private _name: string;
  private _targetEvent: string;
  private _solveFor: string;
  private _power: number;
  private _ciwidth: number;
  private _selectedTests: string[];
  private _typeOneErrorRate: number;
  private _isuFactors: ISUFactors;
  private _gaussianCovariate: GaussianCovariate;
  private _scaleFactor: number;
  private _varianceScaleFactors: number[];
  private _powerCurve: PowerCurve;

  constructor(name?: string,
              guided?: boolean,
              targetEvent?: string,
              solveFor?: string,
              power?: number,
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
    }
    return tables;
  }

  checkDependencies() {
    // Are factorName groups made up of predictors we have defined
    if (this.solveFor === constants.SOLVE_FOR_SAMPLESIZE &&
      !isNullOrUndefined(this.isuFactors.predictors) &&
      this.isuFactors.predictors.length > 0) {
        const groups = this.relativeGroupSizes;
        const combinations = this.isuFactors.generateCombinations(this.isuFactors.predictors);
        if (groups.length !== combinations.length) {
          this.isuFactors.betweenIsuRelativeGroupSizes = this.generateGroupSizeTables();
        }
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

    //TODO: Re instate dependency check
    /**
    // Are marginal means factorName groups made up of hypothesis we have chosen
    if (!isNullOrUndefined(this.isuFactors.hypothesis) &&
      this.isuFactors.hypothesis.length > 0) {
      const groups = this.isuFactors.marginalMeans
      const combinations = this.isuFactors.generateCombinations(this.isuFactors.hypothesis);
      if (groups.size !== combinations.size) {
        this.isuFactors.marginalMeans = combinations;
      }
      groups.forEach(key => {
        if (!combinations.has(key.name) ) {
          this.isuFactors.marginalMeans = combinations;
        }
      });
    }**/

    // Do all of our OutcomeRepMeasStDev still exist
    if (
      !isNullOrUndefined(this.isuFactors)
      && !isNullOrUndefined(this.isuFactors.outcomeRepeatedMeasureStDevs)) {
      const toRemove = [];
      for ( const stDev of this.isuFactors.outcomeRepeatedMeasureStDevs ) {
        let outcomeMatch = false;
        let measureMatch = false;
        for (const outcome of this.isuFactors.outcomes) {
          if (outcome.name === stDev.outcome) {
            outcomeMatch = true;
          }
        }
        for (const measure of this.isuFactors.repeatedMeasures) {
          if (measure.name === stDev.repMeasure) {
            measureMatch = true;
          }
        }
        if (!outcomeMatch || !measureMatch) {
          toRemove.push(this.isuFactors.outcomeRepeatedMeasureStDevs.indexOf(stDev));
        }
      }
      for (const index of toRemove.reverse()) {
        if (index > -1) {
          this.isuFactors.outcomeRepeatedMeasureStDevs.splice(index, 1)
        }
      }
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

  get power(): number {
    return this._power;
  }

  set power(value: number) {
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

  get typeOneErrorRate(): number {
    return this._typeOneErrorRate;
  }

  set typeOneErrorRate(value: number) {
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

  get scaleFactor(): number {
    return this._scaleFactor;
  }

  set scaleFactor(value: number) {
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
}
