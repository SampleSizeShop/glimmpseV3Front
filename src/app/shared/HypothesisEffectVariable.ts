import {MarginalMeansCombination, MarginalMeansCombinationId} from './MarginalMeansCombination';

export class HypothesisEffectVariable {
  name: string;
  origin: string;
  type: string;
  valueNames: string[] = [];
  _child: HypothesisEffectVariable;

  constructor(name?: string, type?: string, origin?: string) {
    if (name) {
      this.name = name;
    }
    if (type) {
      this.type = type;
    }
    if (origin) {
      this.origin = origin;
    }
  }

  mapCombinations() {
    // TODO: need to define 'groups' here
    let combinations = [] ;
    this.valueIds.forEach( value => {
      combinations.push(new MarginalMeansCombination( [value] , 1));
    });

    if (!this._child) {
      return combinations;
    }

    const childCombinations = this._child.mapCombinations();
    combinations = this.combineLists(combinations, childCombinations);
    return combinations;
  }

  combineLists(combinations, childCombinations) {
    const newCombinations = [];
    combinations.forEach( combination => {
        childCombinations.forEach( childCombination => {
          const id = combination.id.concat(childCombination.id);
          newCombinations.push(new MarginalMeansCombination(id, 1));
        });
      }
    );
    return newCombinations;
  }

  get valueIds(): MarginalMeansCombinationId[] {
    const  nameValuePairs = [];
    for ( const valueName of this.valueNames ) {
      nameValuePairs.push( new MarginalMeansCombinationId(this.name, valueName));
    }
    return nameValuePairs;
  }

  compare(variable: HypothesisEffectVariable) {
    if (variable.type === this.type && variable.name === this.name) {
      return true;
    }
    return false;
  }
}
