import {ISUFactor} from './ISUFactor';
import {isNullOrUndefined} from 'util';
import {MarginalMean} from './MarginalMean';
import {constants} from './constants';

export class HypothesisEffect {
  variables: Array<ISUFactor> = [];

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

  get name(): string {
    let name = '';
    this.variables.forEach( variable => {
      name = name.concat(variable.name, ' x ');
    });
    name = name.substring(0, name.length - 3 );
    return name;
  }

  get nature(): string {
    let nature = '';
    this.variables.forEach( variable => {
      nature = nature.concat(variable.nature, ' x ');
    });
    nature = nature.substring(0, nature.length - 3);
    if (this.variables.length === 0) { nature = constants.HYPOTHESIS_NATURE.BETWEEN; }
    return nature;
  }

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
