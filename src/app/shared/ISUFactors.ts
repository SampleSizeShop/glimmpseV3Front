import {Predictor} from './Predictor';
import {ISUFactorCombination} from './ISUFactorCombination';
import {Outcome} from './Outcome';
import {RepeatedMeasure} from './RepeatedMeasure';
import {Cluster} from './Cluster';
import {constants} from './constants';
import {ISUFactor} from './ISUFactor';
import {isNullOrUndefined} from 'util';
import {HypothesisEffect} from './HypothesisEffect';
import {CorrelationMatrix} from './CorrelationMatrix';
import {Group} from './Group';
import {RelativeGroupSizeTable} from './RelativeGroupSizeTable';
import {MarginalMeansTable} from './MarginalMeansTable';
import {PartialMatrix} from "./PartialMatrix";

export class ISUFactors {
  variables = new Array<ISUFactor>();
  theta0 = [[0]];
  betweenIsuRelativeGroupSizes = new Array<RelativeGroupSizeTable>();
  marginalMeans = new Array<MarginalMeansTable>();
  smallestGroupSize: number[] = [];
  outcomeCorrelationMatrix: CorrelationMatrix = new CorrelationMatrix();
  cMatrix: PartialMatrix;

  toJSON() {
    return {
        variables: this.variables,
        betweenIsuRelativeGroupSizes: this.betweenIsuRelativeGroupSizes,
        marginalMeans: this.marginalMeans,
        smallestGroupSize: this.smallestGroupSize,
        theta0: this.theta0,
        outcomeCorrelationMatrix: this.outcomeCorrelationMatrix,
        cMatrix: this.cMatrix};
  }

  get hypothesisName(): string {
    let name = '';
    this.hypothesis.forEach( variable => {
      name = name.concat(variable.name, ' x ');
    });
    name = name.substring(0, name.length - 3 );
    if (name.length === 0) {
      name = 'grand mean';
    }
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
    this.variables = this._updateListOfISUFactors(newOutcomes, 'Outcome');
  }

  get firstOutcome(): Outcome {
    let outcome: Outcome = null;
    if (!isNullOrUndefined(this.outcomes)) {
      outcome = this.outcomes[0];
    }
    return outcome;
  }

  get lastOutcome(): Outcome {
    let outcome: Outcome = null;
    if (!isNullOrUndefined(this.outcomes)) {
      outcome = this.outcomes[this.outcomes.length - 1 ];
    }
    return outcome;
  }

  getNextOutcome(name: string): Outcome {
    let outcome = this.outcomes.find(
      nextOutcome => nextOutcome.name === name
    );
    const nextIndex = this.outcomes.indexOf(outcome) + 1;
    if (nextIndex < this.outcomes.length) {
      outcome = this.outcomes[nextIndex];
    } else {
      outcome = null;
    }
    return outcome
  }

  getPreviousOutcome(name: string): Outcome {
    let outcome = this.outcomes.find(
      prevOutcome => prevOutcome.name === name
    );
    const previousIndex = this.outcomes.indexOf(outcome) - 1;
    if (previousIndex >= 0) {
      outcome = this.outcomes[previousIndex];
    } else {
      outcome = null;
    }
    return outcome
  }

  get repeatedMeasures(): Array<RepeatedMeasure> {
    return this.getFactorsByType(RepeatedMeasure);
  }

  get firstRepeatedMeasure(): RepeatedMeasure {
    let measure: RepeatedMeasure = null;
    if (!isNullOrUndefined(this.repeatedMeasures)) {
      measure = this.repeatedMeasures[0];
    }
    return measure;
  }

  get lastRepeatedMeasure(): RepeatedMeasure {
    let measure: RepeatedMeasure = null;
    if (!isNullOrUndefined(this.repeatedMeasures)) {
      measure = this.repeatedMeasures[this.repeatedMeasures.length - 1 ];
    }
    return measure;
  }

  getNextRepeatedMeasure(name: string): RepeatedMeasure {
    let measure = this.repeatedMeasures.find(
      nextMeasure => nextMeasure.name === name
    );
    const nextIndex = this.repeatedMeasures.indexOf(measure) + 1;
    if (nextIndex < this.repeatedMeasures.length) {
      measure = this.repeatedMeasures[nextIndex];
    } else {
      measure = null;
    }
    return measure
  }

  getPreviousRepeatedMeasure(name: string): RepeatedMeasure {
    let measure = this.repeatedMeasures.find(
      prevMeasure => prevMeasure.name === name
    );
    const previousIndex = this.repeatedMeasures.indexOf(measure) - 1;
    if (previousIndex >= 0) {
      measure = this.repeatedMeasures[previousIndex];
    } else {
      measure = null;
    }
    return measure
  }

  get repeatedMeasuresInHypothesis(): Array<RepeatedMeasure> {
    return this.getFactorsinHypothesisByType(RepeatedMeasure);
  }

  get predictorsInHypothesis(): Array<Predictor> {
    return this.getFactorsinHypothesisByType(Predictor);
  }

  updateRepeatedMeasures(newRepeatedMeasures: Array<RepeatedMeasure>) {
    this.variables = this._updateListOfISUFactors(newRepeatedMeasures, 'RepeatedMeasure');
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
    this.variables = this._updateListOfISUFactors([newCluster], 'Cluster');
  }

  get predictors(): Array<Predictor> {
    return this.getFactorsByType(Predictor);
  }

  get firstPredictor(): Predictor {
    let predictor: Predictor = null;
    if (!isNullOrUndefined(this.predictors)) {
      predictor = this.predictors[0];
    }
    return predictor;
  }

  get lastPredictor(): Predictor {
    let predictor: Predictor = null;
    if (!isNullOrUndefined(this.repeatedMeasures)) {
      predictor = this.predictors[this.predictors.length - 1 ];
    }
    return predictor;
  }

  getNextPredictor(name: string): Predictor {
    let predictor = this.predictors.find(
      nextPredictor => nextPredictor.name === name
    );
    const nextIndex = this.predictors.indexOf(predictor) + 1;
    if (nextIndex < this.predictors.length) {
      predictor = this.predictors[nextIndex];
    } else {
      predictor = null;
    }
    return predictor
  }

  getPreviousPredictor(name: string): Predictor {
    let predictor = this.predictors.find(
      prevPredictor => prevPredictor.name === name
    );
    const previousIndex = this.predictors.indexOf(predictor) - 1;
    if (previousIndex >= 0) {
      predictor = this.predictors[previousIndex];
    } else {
      predictor = null;
    }
    return predictor
  }

  updatePredictors(newPredictors: Array<Predictor>) {
    this.variables = this._updateListOfISUFactors(newPredictors, 'Predictor');
    this.populateRelativeGroupSizes();
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

  getFactorsinHypothesisByType( type ) {
    const array = new Array();
    this.hypothesis.forEach( variable => {
      if (variable.constructor.name === type.name) {
        array.push(variable);
      }
    });
    return array;
  }

  _updateListOfISUFactors<K extends ISUFactor>(newFactors: Array<K>,  type?: string): Array<ISUFactor> {
    const toDelete = [];
    if (!type && !isNullOrUndefined(newFactors[0])) {
      type = newFactors[0].constructor.name
    }
    // Delete each variable of type K
    this.variables.forEach(variable => {
      if (isNullOrUndefined(variable) || variable.constructor.name === type
        ) {
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

    // Add the new list
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

  generateCombinations(factorList: Array<ISUFactor>): Array<ISUFactorCombination> {
    let combinations = new Array<ISUFactorCombination>();

    if (!isNullOrUndefined(factorList) && factorList.length > 0) {
      let factors = new Array<ISUFactor>();
      factorList.forEach( factor => {
        factors.push(factor);
      });
      factors = this.assignChildren(factors);
      combinations = factors[0].mapCombinations();
      combinations.forEach( combination => {
        this.orderCombination(combination);
      });
    }
    return combinations
  }

  orderCombination(combination: ISUFactorCombination) {
    if (!isNullOrUndefined(combination.id)) {
      combination.id.forEach( factor => {
        if (factor.factorType === constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR) {
          // get predictor by name
          // apply order from value list
          this.predictors.forEach( predictor => {
            if (predictor.name === factor.factorName) {
              factor.order = predictor.valueNames.indexOf(factor.value)
            }
          });
        }
      });
    }
  }

  assignChildren(factorList: ISUFactor[]) {
    const factorsWithChildrenAssigned = [];
    factorList.forEach( factor => {
      factor.child = null;
    })
    let parent = factorList.shift();
    while (factorList.length > 0) {
      const child = factorList.shift();
      parent.child = child
      factorsWithChildrenAssigned.push(parent);
      parent = child;
    }
    factorsWithChildrenAssigned.push(parent);
    factorList = factorsWithChildrenAssigned;
    return factorList;
  }

  populateRelativeGroupSizes() {
    const tableIds = this.getRelativeGroupSizeTableNames();
    const groups = this.generateCombinations(this.predictors) as Array<Group>;
    tableIds.forEach(tableId => {
        const table = new RelativeGroupSizeTable( tableId, null );
        table.populateTable(groups);
        this.betweenIsuRelativeGroupSizes.push(table);
    });
  }

  getRelativeGroupSizeTableNames(): ISUFactorCombination[] {
    const names = [];
    this.predictors.forEach( predictor => {
      names.push(predictor.name);
    });
    names.pop();
    names.pop();

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
    const tableNames = groups[0].mapCombinations();
    return tableNames;
  }

  get firstRelativeGroupSizeTable(): RelativeGroupSizeTable {
    let table: RelativeGroupSizeTable = null;
    if (!isNullOrUndefined(this.betweenIsuRelativeGroupSizes) && this.betweenIsuRelativeGroupSizes.length > 0) {
      table = this.betweenIsuRelativeGroupSizes[0];
    }
    return table;
  }

  getNextRelativeGroupSizeTable(index: number): RelativeGroupSizeTable {
    let table: RelativeGroupSizeTable = null;
    const nextIndex = index + 1;
    if (nextIndex < this.betweenIsuRelativeGroupSizes.length) {
      table = this.betweenIsuRelativeGroupSizes[nextIndex];
    } else {
      table = null;
    }
    return table
  }

  get firstMarginalMeansTable(): MarginalMeansTable {
    let table: MarginalMeansTable = null;
    if (!isNullOrUndefined(this.marginalMeans) && this.marginalMeans.length > 0) {
      table = this.marginalMeans[0];
    }
    return table;
  }

  getNextMarginalMeansTable(index: number): MarginalMeansTable {
    let table: MarginalMeansTable = null;
    const nextIndex = index + 1;
    if (nextIndex < this.marginalMeans.length) {
      table = this.marginalMeans[nextIndex];
    } else {
      table = null;
    }
    return table
  }

}
