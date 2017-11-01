import {WithinISUFactors} from './WithinISUFactors';
import {BetweenISUFactors} from './BetweenISUFactors';
import {GaussianCovariate} from './GaussianCovariate';
import {HypothesisEffect} from './HypothesisEffect';
import {isNullOrUndefined} from "util";
import {HypothesisEffectVariable} from "./HypothesisEffectVariable";
import {constants} from "./constants";

export class StudyDesign {
  private _name: string;
  private _targetEvent: string;
  private _solveFor: string;
  private _power: number;
  private _samplesize: number;
  private _ciwidth: number;
  private _selectedTests: string[];
  private _typeOneErrorRate: number;
  private _withinIsuFactors: WithinISUFactors;
  private _betweenIsuFactors: BetweenISUFactors;
  private _gaussianCovariate: GaussianCovariate;
  private _betweenHypothesisNature: string;
  private _withinHypothesisNature: string;
  private _hypothesisEffect: HypothesisEffect;

  constructor(name?: string,
              guided?: boolean,
              targetEvent?: string,
              solveFor?: string,
              power?: number,
              samplesize?: number,
              ciwidth?: number,
              selectedTests?: Set<string>,
              typeOneErrorRate?: number,
              withinIsuFactors?: WithinISUFactors,
              betweenIsuFactors?: BetweenISUFactors,
              gaussianCovariates?: GaussianCovariate,
              betweenHypothesisNature?: string,
              withinHypothesisNature?: string,
              hypothesisEffect?: HypothesisEffect
) {
    this.withinIsuFactors = new WithinISUFactors();
  }

  checkDependencies() {
    if (!isNullOrUndefined(this.hypothesisEffect)) {

      let possibleEffect = true;
      const variables = this.variables;
      if (!isNullOrUndefined(variables) && !isNullOrUndefined(this.hypothesisEffect.variables)) {
        this.hypothesisEffect.variables.forEach(variable => {
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
        this.hypothesisEffect = null;
      }

    };
  }

  get variables() {
    const variables = [];
    this.withinIsuFactors.outcomes.forEach( outcome => {
      const variable = new HypothesisEffectVariable(
        outcome,
        constants.HYPOTHESIS_NATURE.WITHIN,
        constants.HYPOTHESIS_ORIGIN.OUTCOME);
      variables.push(variable);
    });
    this.withinIsuFactors.repeatedMeasures.forEach( repeatedMeasure => {
      const variable = new HypothesisEffectVariable(
        repeatedMeasure.dimension,
        constants.HYPOTHESIS_NATURE.WITHIN,
        constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE);
      variables.push(variable);
    });
    if (!isNullOrUndefined(this.betweenIsuFactors) && !isNullOrUndefined(this.betweenIsuFactors.predictors)) {
      this.betweenIsuFactors.predictors.forEach( predictor => {
        const variable = new HypothesisEffectVariable(
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

  get withinIsuFactors(): WithinISUFactors {
    return this._withinIsuFactors;
  }

  set withinIsuFactors(value: WithinISUFactors) {
    this._withinIsuFactors = value;
  }

  get betweenIsuFactors(): BetweenISUFactors {
    return this._betweenIsuFactors;
  }

  set betweenIsuFactors(value: BetweenISUFactors) {
    this._betweenIsuFactors = value;
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

  get hypothesisEffect(): HypothesisEffect {
    return this._hypothesisEffect;
  }

  set hypothesisEffect(value: HypothesisEffect) {
    this._hypothesisEffect = value;
  }
}
