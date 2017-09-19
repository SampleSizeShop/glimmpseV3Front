import {Predictor} from './Predictor';
import {BetweenIsuCombination} from './BetweenIsuCombination';

export class BetweenISUFactors {
  predictors: Predictor[] = [];
  combinations = new Map();
  smallestGroupSize: number[] = [];

  generateCombinations() {
    this.predictors = this.assignChildren(this.predictors);
    const combinationList = this.predictors[0].mapCombinations();
    combinationList.forEach( combination => {
      this.combinations.set(combination.id, combination);
    });
  }

  groupCombinations() {
    if (this.predictors && ( this.predictors.length === 1 || this.predictors.length === 2)) {
      const names = this.predictorNames;
      return [{table: names}];
    }
    if (this.predictors && this.predictors.length > 2) {
      const names = this.predictorNames;
      const table = [names.pop(), names.pop()];
      const subGroups = this.getSubGroups(names);
      const subGroupCombinations = [];

      subGroups.forEach( subGroup => {
        const group = [];

        this.combinations.forEach(combination => {
          if (this.isElementinSubGroup(combination, subGroup)) {
            group.push(combination);
          }
        });

        subGroupCombinations.push(group);
      });
      return [{table: table}, {subGroups: subGroupCombinations}];
    }
  }

  isElementinSubGroup(combination: BetweenIsuCombination, subGroup: BetweenIsuCombination) {
    let include = true;
    combination.id.forEach(value => {
      subGroup.id.forEach( element => {
        if ( value.predictor === element.predictor && value.name !== element.name ) {
          include = false;
        }
      });
    });
    return include;
  }

  getSubGroups(names: string[]): BetweenIsuCombination[] {
    let groups = [];
    names.forEach( name => {
      this.predictors.forEach( predictor => {
        if (predictor.name === name) {
          groups.push(predictor);
        }
      })
    });
    groups = this.assignChildren(groups);
    const subgroups = groups[0].mapCombinations();
    return subgroups;
  }

  assignChildren(predictorList: Predictor[]) {
    const predictorsWithChildrenAssigned = [];
    predictorList.forEach( predictor => {
      predictor.child = null;
    })
    let parent = predictorList.pop();
    while (predictorList.length > 0) {
      const child = predictorList.pop();
      parent.child = child
      predictorsWithChildrenAssigned.push(parent);
      parent = child;
    }
    predictorsWithChildrenAssigned.push(parent);
    predictorList = predictorsWithChildrenAssigned;
    return predictorList;
  }

  get predictorNames() {
    const names = [];
    this.predictors.forEach( predictor => {
      names.push(predictor.name);
    });
    return names;
  }
}
