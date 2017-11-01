import {HypothesisEffectVariable} from './HypothesisEffectVariable';
import {isNullOrUndefined} from 'util';
import {MarginalMeansCombination} from "./MarginalMeansCombination";
import {constants} from "./constants";

export class HypothesisEffect {
  variables: HypothesisEffectVariable[] = [];
  type: string;
  marginalMeans: MarginalMeansCombination[] = [];

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
      nature = nature.concat(variable.type, ' X ');
    });
    nature = nature.substring(0, nature.length - 3);
    if (this.variables.length === 0) { nature = 'BETWEEN'; }
    return nature;
  }

  addVariable(variable: HypothesisEffectVariable) {
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

  generateCombinations() {
    const names = '';
  }

  get variableNames(): Array<string> {
    const names = Array<string>();
    this.variables.forEach( variable => {
       if ( variable.origin === '') {}
    });
    return names;
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
        if (variable1.name === variable2.name && variable1.type === variable2.type ) {
          found = true;
        }
      });
      if (!found) { match = false; }
    } )
    return match;
  }
}
