import {ISUFactorCombination, CombinationId} from './ISUFactorCombination';

export class ISUFactor {
  name: string;
  origin: string;
  nature: string;
  valueNames: string[] = [];
  _child: ISUFactor;
  inHypothesis: boolean;

  constructor(name?: string, nature?: string, origin?: string) {
    if (name) {
      this.name = name;
    }
    if (nature) {
      this.nature = nature;
    }
    if (origin) {
      this.origin = origin;
    }
    this.inHypothesis = false;
  }

  mapCombinations(): Array<ISUFactorCombination> {
    // TODO: need to define 'valueNames' here
    let combinations = new Array<ISUFactorCombination>();
    this.valueIds.forEach( value => {
      combinations.push(new ISUFactorCombination( [value] , 1));
    });

    if (!this._child) {
      return combinations;
    } else {
      const childCombinations = this._child.mapCombinations();
      combinations = this.combineLists(combinations, childCombinations);
      return combinations;
    }
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

  get valueIds(): Array<CombinationId> {
    const nameValuePairs = [];
    for ( const valueName of this.valueNames ) {
      nameValuePairs.push( new CombinationId(this.name, valueName));
    }
    return nameValuePairs;
  }

  compare(variable: ISUFactor) {
    if (variable.nature === this.nature && variable.name === this.name) {
      return true;
    }
    return false;
  }
}
