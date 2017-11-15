import {ISUFactorCombination, CombinationId} from './ISUFactorCombination';

export class MarginalMean {
  name = '';
  groups: string[] = [];
  child: MarginalMean;

  mapCombinations() {
    let combinations = [] ;
    this.groupIds.forEach( group => {
      combinations.push(new ISUFactorCombination( [group] , 1));
    });

    if (!this.child) {
      return combinations;
    }

    const childCombinations = this.child.mapCombinations();
    combinations = this.combineLists(combinations, childCombinations);
    return combinations;
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
    for ( const group of this.groups ) {
      nameGroupPairs.push( new CombinationId(this.name, group));
    }
    return nameGroupPairs;
  }
}
