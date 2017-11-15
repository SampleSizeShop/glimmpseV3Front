import {Predictor} from './Predictor';
import {CombinationId, ISUFactorCombination} from './ISUFactorCombination';
import {ISUFactorCombinationTable} from './ISUFactorCombinationTable';
import {Outcome} from './Outcome';
import {RepeatedMeasure} from './RepeatedMeasure';
import {Cluster} from './Cluster';
import {constants} from './constants';
import {ISUFactor} from './ISUFactor';
import {isNullOrUndefined} from 'util';
import {HypothesisEffect} from "./HypothesisEffect";

export class ISUFactors {
  variables = new Array<ISUFactor>();
  betweenIsuRelativeGroupSizes = new Map<string, ISUFactorCombination>();
  marginalMeans = new Map<string, ISUFactorCombination>();
  smallestGroupSize: number[] = [];

  get hypothesisName(): string {
    let name = '';
    this.hypothesis.forEach( variable => {
      name = name.concat(variable.name, ' x ');
    });
    name = name.substring(0, name.length - 3 );
    return name;
  }

  get hypothesisNature(): string {
    let nature = '';
    this.hypothesis.forEach( variable => {
      nature = nature.concat(variable.nature, ' x ');
    });
    nature = nature.substring(0, nature.length - 3);
    if (this.hypothesis.length === 0) { nature = constants.HYPOTHESIS_NATURE.BETWEEN; }
    return nature;
  }

  get outcomes(): Array<Outcome> {
    return this.getFactorsByType(Outcome);
  }

  updateOutcomes(newOutcomes: Array<Outcome>) {
    this.variables = this._updateListOfISUFactors(newOutcomes);
  }

  get repeatedMeasures(): Array<RepeatedMeasure> {
    return this.getFactorsByType(RepeatedMeasure);
  }

  updateRepeatedMeasures(newRepeatedMeasures: Array<RepeatedMeasure>) {
    this.variables = this._updateListOfISUFactors(newRepeatedMeasures);
  }

  get cluster(): Cluster {
    const clusterArray = this.getFactorsByType(Cluster);
    if (!isNullOrUndefined(clusterArray) && clusterArray.length === 1) {
      return clusterArray[0];
    } else {
      return null;
    }
  }

  updateCluster(newCluster: Cluster) {
    this.variables = this._updateListOfISUFactors([newCluster]);
  }

  get predictors(): Array<Predictor> {
    return this.getFactorsByType(Predictor);
  }

  updatePredictors(newPredictors: Array<Predictor>) {
    this.variables = this._updateListOfISUFactors(newPredictors);
  }

  getFactorsByType( type ) {
    const array = new Array();
    this.variables.forEach( variable => {
      if (variable.constructor.name === type.name) {
        array.push(variable);
      }
    });
    return array;
  }

  _updateListOfISUFactors<K extends ISUFactor>(newFactors: Array<K>): Array<ISUFactor> {
    const toDelete = [];
    this.variables.forEach(variable => {
      if (isNullOrUndefined(variable) ||
        (!isNullOrUndefined(newFactors[0]) && variable.constructor.name === newFactors[0].constructor.name)) {
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
    return this.variables.concat(newFactors);
  }

  get hypothesis(): Array<ISUFactor> {
    const hypothesis = new Array<ISUFactor>();
    this.variables.forEach( variable => {
      if (variable.inHypothesis) {
        hypothesis.push(variable);
      }
    });
    return hypothesis;
  }

  clearHypothesis() {
    this.variables.forEach(variable => {
      variable.inHypothesis = false;
    });
  }

  updateHypothesis(effect: HypothesisEffect) {
    this.clearHypothesis();
    this.variables.forEach( variable => {
      effect.variables.forEach( eff => {
        if (eff.compare(variable)) {
          variable.inHypothesis = true;
        }
      });
    });
  }

  generateCombinations(factorList: Array<ISUFactor>): Map<string, ISUFactorCombination> {
    const combinations = new Map<string, ISUFactorCombination>();

    if (!isNullOrUndefined(factorList) && factorList.length > 0) {
      let factors = new Array<ISUFactor>();
      factors = factors.concat(factorList);
      factors = this.assignChildren(factors);
      const combinationList = factors[0].mapCombinations();
      combinationList.forEach(combination => {
        combinations.set(combination.name, combination);
      });
    }
    return combinations
  }

  groupCombinations(combinationMap: Map<string, ISUFactorCombination>, factors: Array<ISUFactor>): Array<ISUFactorCombinationTable> {
    const names = [];
    const tableDimensions = [];

    factors.forEach( factor => {
      names.push(factor.name);
    });
    if ( names.length > 0 ) { tableDimensions.push(names.pop()); }
    if ( names.length > 0 ) { tableDimensions.push(names.pop()); }

    const subGroupCombinations = this.getSubGroupCombinations(names, factors);
    const subGroups = [];
    const tables = [];

    if ( subGroupCombinations.length > 0 ) {
      subGroupCombinations.forEach(subGroup => {
        const group = [];

        combinationMap.forEach(combination => {
          if (this.isElementinSubGroup(combination, subGroup)) {
            group.push(combination);
          }
        });

        subGroups.push([subGroup, group]);
      });

      subGroups.forEach(subGroup => {
        const table = new ISUFactorCombinationTable(subGroup[1], tableDimensions, subGroup[0].id);
        tables.push(table);
      });
    } else {
      const combinations = [];
      combinationMap.forEach(combination => {
        combinations.push( combination );
      } );
      const table = new ISUFactorCombinationTable(combinations, tableDimensions, []);
      tables.push(table);
    }

    return tables;
  }

  isElementinSubGroup(combination: ISUFactorCombination, subGroup: ISUFactorCombination) {
    let include = true;
    combination.id.forEach(value => {
      subGroup.id.forEach( element => {
        if ( value.id === element.id && value.value !== element.value ) {
          include = false;
        }
      });
    });
    return include;
  }

  getSubGroupCombinations(names: string[], factors: Array<ISUFactor>): ISUFactorCombination[] {
    let groups = [];
    names.forEach( name => {
      factors.forEach( factor => {
        if (factor.name === name) {
          groups.push(factor);
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

  assignChildren(factorList: ISUFactor[]) {
    const factorsWithChildrenAssigned = [];
    factorList.forEach( factor => {
      factor.child = null;
    })
    let parent = factorList.pop();
    while (factorList.length > 0) {
      const child = factorList.pop();
      parent.child = child
      factorsWithChildrenAssigned.push(parent);
      parent = child;
    }
    factorsWithChildrenAssigned.push(parent);
    factorList = factorsWithChildrenAssigned;
    return factorList;
  }
}
