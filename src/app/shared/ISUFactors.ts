import {Predictor} from './Predictor';
import {BetweenIsuCombination} from './BetweenIsuCombination';
import {BetweenIsuCombinationTable} from './BetweenIsuCombinationTable';
import {Outcome} from './Outcome';
import {RepeatedMeasure} from './RepeatedMeasure';
import {Cluster} from './Cluster';
import {constants} from './constants';
import {IsuFactor} from './HypothesisEffectVariable';
import {isNullOrUndefined} from "util";

export class ISUFactors {
  variables = new Array<IsuFactor>();
  combinations = new Map();
  smallestGroupSize: number[] = [];

  get hypothesisName(): string {
    let name = '';
    this.variables.forEach( variable => {
      name = name.concat(variable.name, ' x ');
    });
    name = name.substring(0, name.length - 3 );
    return name;
  }

  get hypothesisNature(): string {
    let nature = '';
    this.variables.forEach( variable => {
      nature = nature.concat(variable.nature, ' x ');
    });
    nature = nature.substring(0, nature.length - 3);
    if (this.variables.length === 0) { nature = constants.HYPOTHESIS_NATURE.BETWEEN; }
    return nature;
  }

  get outcomes(): Array<Outcome> {
    const outcomes = new Array<Outcome>();
    this.variables.forEach( variable => {
      if (variable instanceof Outcome) {
        outcomes.push(variable);
      }
    });
    return outcomes;
  }

  updateOutcomes(newOutcomes: Array<Outcome>) {
    const toDelete = [];
    this.variables.forEach(variable => {
      if (variable instanceof Outcome || isNullOrUndefined(variable)) {
        const index = this.variables.indexOf(variable);
        if (index !== -1 || isNullOrUndefined(variable)) {
          toDelete.push(index);
        }
      }
    });
    toDelete.reverse();
    toDelete.forEach( index => {
      this.variables.splice(index, 1);
    });
    this.variables = this.variables.concat(newOutcomes);
  }

  get repeatedMeasures(): Array<RepeatedMeasure> {
    const outcomes = new Array<RepeatedMeasure>();
    this.variables.forEach( variable => {
      if (variable instanceof RepeatedMeasure) {
        outcomes.push(variable);
      }
    });
    return outcomes;
  }

  updateRepeatedMeasures(newRepeatedMeasures: Array<RepeatedMeasure>) {
    const toDelete = [];
    this.variables.forEach(variable => {
      if (variable instanceof RepeatedMeasure || isNullOrUndefined(variable)) {
        const index = this.variables.indexOf(variable);
        if (index !== -1 || isNullOrUndefined(variable)) {
          toDelete.push(index);
        }
      }
    });
    toDelete.reverse();
    toDelete.forEach( index => {
      this.variables.splice(index, 1);
    });
    this.variables = this.variables.concat(newRepeatedMeasures);
  }

  get cluster(): Cluster {
    let cluster = null;
    this.variables.forEach( variable => {
      if (variable instanceof Cluster) {
        cluster = variable;
      }
    });
    return cluster;
  }

  updateCluster(newCluster: Cluster) {
    const toDelete = [];
    this.variables.forEach(variable => {
      if (variable instanceof Cluster || isNullOrUndefined(variable)) {
        const index = this.variables.indexOf(variable);
        if (index !== -1 || isNullOrUndefined(variable)) {
          toDelete.push(index);
        }
      }
    });
    toDelete.reverse();
    toDelete.forEach( index => {
      this.variables.splice(index, 1);
    });
    this.variables = this.variables.concat([newCluster]);
  }

  get predictors(): Array<Predictor> {
    const predictors = new Array<Predictor>();
    this.variables.forEach( variable => {
      if (variable instanceof Predictor) {
        predictors.push(variable);
      }
    });
    return predictors;
  }

  updatePredictors(newPredictors: Array<Predictor>) {
    const toDelete = [];
    this.variables.forEach(variable => {
      if (variable instanceof Predictor || isNullOrUndefined(variable)) {
        const index = this.variables.indexOf(variable);
        if (index !== -1 || isNullOrUndefined(variable)) {
          toDelete.push(index);
        }
      }
    });
    toDelete.reverse();
    toDelete.forEach( index => {
      this.variables.splice(index, 1);
    });
    this.variables = this.variables.concat(newPredictors);
  }

  generateCombinations() {
    this.combinations = new Map();
    let predictors = this.predictors;
    predictors = this.assignChildren(predictors);
    const combinationList = predictors[0].mapCombinations();
    combinationList.forEach( combination => {
      this.combinations.set(combination.id, combination);
    });
  }

  groupCombinations() {
    const names = this.predictorNames;
    const tableDimensions = [];
    if ( !this.predictors ) {
      // TODO: log error and navigate to some sort of error page???
      return null;
    }

    if ( names.length > 0 ) { tableDimensions.push(names.pop()); }
    if ( names.length > 0 ) { tableDimensions.push(names.pop()); }

    const subGroupCombinations = this.getSubGroupCombinations(names);
    const subGroups = [];
    const tables = [];

    if ( subGroupCombinations.length > 0 ) {
      subGroupCombinations.forEach(subGroup => {
        const group = [];

        this.combinations.forEach(combination => {
          if (this.isElementinSubGroup(combination, subGroup)) {
            group.push(combination);
          }
        });

        subGroups.push([subGroup, group]);
      });

      subGroups.forEach(subGroup => {
        const table = new BetweenIsuCombinationTable(subGroup[1], tableDimensions, subGroup[0].id);
        tables.push(table);
      });
    } else {
      const combinations = [];
      this.combinations.forEach( combination => {
        combinations.push( combination );
      } );
      const table = new BetweenIsuCombinationTable(combinations, tableDimensions, []);
      tables.push(table);
    }

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
    if ( groups.length === 0 ) {
      return [];
    }
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
