import {ISUFactors} from './ISUFactors';
import {GaussianCovariate} from './GaussianCovariate';
import {HypothesisEffect} from './HypothesisEffect';
import {isNullOrUndefined} from 'util';
import {ISUFactor} from './ISUFactor';
import {constants} from './constants';
import {CombinationId, ISUFactorCombination} from "./ISUFactorCombination";

export class StudyDesign {
  private _name: string;
  private _targetEvent: string;
  private _solveFor: string;
  private _power: number;
  private _samplesize: number;
  private _ciwidth: number;
  private _selectedTests: string[];
  private _typeOneErrorRate: number;
  private _isuFactors: ISUFactors;
  private _gaussianCovariate: GaussianCovariate;
  private _betweenHypothesisNature: string;
  private _withinHypothesisNature: string;
  private _scaleFactor: number;

  constructor(name?: string,
              guided?: boolean,
              targetEvent?: string,
              solveFor?: string,
              power?: number,
              samplesize?: number,
              ciwidth?: number,
              selectedTests?: Set<string>,
              typeOneErrorRate?: number,
              isuFactors?: ISUFactors,
              gaussianCovariates?: GaussianCovariate,
              betweenHypothesisNature?: string,
              withinHypothesisNature?: string,
              hypothesisEffect?: HypothesisEffect,
              scaleFactor?: number,
) {
    this.isuFactors = new ISUFactors();
  }

  checkDependencies() {
    // Are id groups made up of predictors we have defined
    if (this.solveFor === constants.SOLVE_FOR_SAMPLESIZE &&
      !isNullOrUndefined(this.isuFactors.predictors) &&
      this.isuFactors.predictors.length > 0) {
        const groups = this.isuFactors.betweenIsuRelativeGroupSizes
        const combinations = this.isuFactors.generateCombinations(this.isuFactors.predictors);
        if (groups.size !== combinations.size) {
          this.isuFactors.betweenIsuRelativeGroupSizes = combinations;
        }
        groups.forEach(key => {
          if (!combinations.has(key.name) ) {
            this.isuFactors.betweenIsuRelativeGroupSizes = combinations;
          }
        });
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

    // Are marginal means id groups made up of hypothesis we have chosen
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

  get samplesize(): number {
    return this._samplesize;
  }

  set samplesize(value: number) {
    this._samplesize = value;
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

  get betweenHypothesisNature(): string {
    return this._betweenHypothesisNature;
  }

  set betweenHypothesisNature(value: string) {
    this._betweenHypothesisNature = value;
  }

  get withinHypothesisNature(): string {
    return this._withinHypothesisNature;
  }

  set withinHypothesisNature(value: string) {
    this._withinHypothesisNature = value;
  }

  get scaleFactor(): number {
    return this._scaleFactor;
  }

  set scaleFactor(value: number) {
    this._scaleFactor = value;
  }
}
