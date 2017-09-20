import {Predictor} from './Predictor';
import {BetweenIsuCombination} from './BetweenIsuCombination';
import {BetweenIsuCombinationTable} from './BetweenIsuCombinationTable';

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
    const names = this.predictorNames;
    let tableDimensions = [];
    if (this.predictors && ( this.predictors.length === 1 || this.predictors.length === 2)) {
      tableDimensions = names;
    }
    if (this.predictors && this.predictors.length > 2) {
      tableDimensions = [names.pop(), names.pop()];
    }

    const subGroupCombinations = this.getSubGroupCombinations(names);
    const subGroups = [];

    subGroupCombinations.forEach( subGroup => {
      const group = [];

      this.combinations.forEach(combination => {
        if (this.isElementinSubGroup(combination, subGroup)) {
          group.push(combination);
        }
      });

      subGroups.push([subGroup, group]);
    });

    const tables = [];
    subGroups.forEach( subGroup => {
      const table = new BetweenIsuCombinationTable( subGroup[1], tableDimensions, subGroup[0].id );
      tables.push(table);
    } );

    return tables;
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

  getSubGroupCombinations(names: string[]): BetweenIsuCombination[] {
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
