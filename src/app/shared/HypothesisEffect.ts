import {ISUFactor} from './ISUFactor';
import {isNullOrUndefined} from 'util';
import {constants} from './constants';

/**
 * Model object which holds a list of ISUFactors, chosen by the user, which make up their hypothesis.
 */
export class HypothesisEffect {
  variables: Array<ISUFactor> = [];

  constructor() {
    this.variables = [];
  }

  /**
   * Methos which lets you know whether this hypothesis is a Grand Mean, Interaction or Main Effect
   * @returns {string} one of: 'Grand Mean', 'Interaction', 'Main Effect'
   */
  get type(): string {
    let type = '';
    if (isNullOrUndefined(this.variables) || this.variables.length === 0) {
      type = constants.HYPOTHESIS_EFFECT_TYPE.GRAND_MAEN;
    } else if ( this.variables.length > 1 ) {
      type = constants.HYPOTHESIS_EFFECT_TYPE.INTERACTION;
    } else {
      type = constants.HYPOTHESIS_EFFECT_TYPE.MAIN_EFFECT;
    }
    return type;
  }

  /**
   * Returns a description of this hypothesis, based on it's component ISUFactors, for display on screen.
   * @returns {string} description of this hypothesis, based on it's component ISUFactors eg. "A x B x C"
   */
  get name(): string {
    let name = '';
    this.variables.forEach( variable => {
      name = name.concat(variable.name, ' x ');
    });
    name = name.substring(0, name.length - 3 );
    return name;
  }

  /**
   * Returns a description of the nature of this hypothesis, based on it's component ISUFactors, for display on screen.
   * @returns {string} description of the nature of this hypothesis, based on it's component ISUFactors e.g. "Within x Between"
   */
  get nature(): string {
    let nature = '';
    this.variables.forEach( variable => {
      nature = nature.concat(variable.nature, ' x ');
    });
    nature = nature.substring(0, nature.length - 3);
    if (this.variables.length === 0) { nature = constants.HYPOTHESIS_NATURE.BETWEEN; }
    return nature;
  }

  /**
   * Adds an ISUFactor to this hypothesis.
   * @param {ISUFactor} variable ISUFactor to be added to hypothesis.
   */
  addVariable(variable: ISUFactor) {
    let existsInList = false;
    this.variables.forEach( value => {
      if (value.compare(variable)) {
        existsInList = true;
      }
    });
    if (!existsInList) {
      this.variables.push(variable);
    }
  }

  /**
   * Determines if two Hypothesis effect objects contain the same hypothesis.
   * @param {HypothesisEffect} effect
   * @returns {boolean}
   */
  equals (effect: HypothesisEffect) {
    if ( isNullOrUndefined(this.variables) || isNullOrUndefined(effect) || isNullOrUndefined(effect.variables) ) {
      return false;
    }
    if ( this.variables.length !== effect.variables.length ) {
      return false;
    }
    let match = true;
    this.variables.forEach( variable1 => {
      let found = false;
      effect.variables.forEach( variable2 => {
        if (variable1.name === variable2.name && variable1.origin === variable2.origin ) {
          found = true;
        }
      });
      if (!found) { match = false; }
    } )
    return match;
  }
}
