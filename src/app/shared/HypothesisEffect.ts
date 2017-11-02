import {HypothesisEffectVariable} from './HypothesisEffectVariable';
import {isNullOrUndefined} from 'util';
import {MarginalMean} from './MarginalMean';
import {constants} from './constants';

export class HypothesisEffect {
  variables: HypothesisEffectVariable[] = [];
  type: string;
  marginalMeans: Array<MarginalMean>;
  combinations = new Map();

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
    this.combinations = new Map();
    this.variables = this.assignChildren(this.variables);
    const combinationList = this.variables[0].mapCombinations();
    combinationList.forEach( combination => {
      this.combinations.set(combination.id, combination);
    });
    this.variables.forEach( variable => {
      variable._child = null;
    });
  }

  assignChildren(variableList: HypothesisEffectVariable[]) {
    const variablesithChildrenAssigned = Array<HypothesisEffectVariable>();
    variableList.forEach( variable => {
      variable._child = null;
    })
    let parent = variableList.pop();
    while (variableList.length > 0) {
      const child = variableList.pop();
      parent._child = child
      variablesithChildrenAssigned.push(parent);
      parent = child;
    }
    variablesithChildrenAssigned.push(parent);
    variableList = variablesithChildrenAssigned;
    return variableList;
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
        if (variable1.name === variable2.name && variable1.nature === variable2.nature ) {
          found = true;
        }
      });
      if (!found) { match = false; }
    } )
    return match;
  }
}
