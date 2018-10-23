import {ISUFactorCombination} from './ISUFactorCombination';
import {ISUFactor} from './ISUFactor';
import {constants} from './constants';
import {CombinationId} from './CombinationId';

export class Predictor extends ISUFactor {
  units: string;
  type: string;
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
          newCombinations.push(new ISUFactorCombination(id));
      });
      }
    );
    return newCombinations;
  }
}

