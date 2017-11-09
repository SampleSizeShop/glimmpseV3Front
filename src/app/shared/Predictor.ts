import {ISUFactorCombination, CombinationId} from './ISUFactorCombination';
import {ISUFactor} from './ISUFactor';
import {constants} from './constants';
import {isNullOrUndefined} from "util";

export class Predictor extends ISUFactor {

  constructor(name?: string) {
    if (name) {
      super(name);
    } else {
      super();
    }
    this.nature = constants.HYPOTHESIS_NATURE.BETWEEN;
    this.origin = constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR;
  }

  combineLists(combinations, childCombinations) {
    const newCombinations = [];
    combinations.forEach( combination => {
      childCombinations.forEach( childCombination => {
          const id = combination.id.concat(childCombination.id);
          newCombinations.push(new ISUFactorCombination(id, 1));
      });
      }
    );
    return newCombinations;
  }

  get groupIds(): CombinationId[] {
    const  nameGroupPairs = [];
    for ( const group of this.valueNames ) {
      nameGroupPairs.push( new CombinationId(this.name, group));
    }
    return nameGroupPairs;
  }
}

