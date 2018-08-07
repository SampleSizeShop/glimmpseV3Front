import {ISUFactorCombinationTable} from './ISUFactorCombinationTable';
import {ISUFactorCombination} from './ISUFactorCombination';
import {CombinationId} from './CombinationId';
import {ISUFactors} from './ISUFactors';
import {isNullOrUndefined} from 'util';
import {RepeatedMeasure} from './RepeatedMeasure';
import {constants} from './constants';
import {Predictor} from './Predictor';
import {ISUFactor} from './ISUFactor';


export class MarginalMeansTable extends ISUFactorCombinationTable {
  constructor(tableId?: ISUFactorCombination, table?: Array<Array<ISUFactorCombination>>) {
    super(tableId, table);
  }

  populateTable(factors: ISUFactors) {
    this.table = [];
    const colIds = this.getColumnIds(factors.repeatedMeasures);
    if (this._containsPredictor(factors.hypothesis)) {
      this.getRows(factors.predictors, colIds);
    } else {
      this.table.push(this.getRow(new CombinationId('', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '', 0), colIds));
    }
    const a = 1;
  }

  _containsPredictor(factors: Array<ISUFactor>) {
    let ret = false;
    factors.forEach( factor => {
      if (factor.origin === constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR) { ret = true; }
    });
    return ret;
  }

  get hashcode() {
   let hash = '';
   if (!isNullOrUndefined(this.tableId)) {
     hash = hash + this.tableId.name;
   }
   if (!isNullOrUndefined(this.table)) {
     this.table.forEach( row => {
       row.forEach( col => {
         hash = hash + col.name;
       });
     });
   }
   return hash;
  }

  getRowLabel(element: ISUFactorCombination) {
    let label = '';
    element.id.forEach( factor => {
      if (factor.factorType === constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR) {
        label = label + ' ' + factor.factorName + ' : ' + factor.value;
      }
    });
    return label;
  }

  getColLabel(element: ISUFactorCombination) {
    let label = '';
    element.id.forEach( factor => {
      if (factor.factorType === constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE) {
        label = label + factor.factorName + ' : ' + factor.value;
      }
    });
    return label;
  }

  compareSizeAndDimensions(other: MarginalMeansTable) {
    if (this.hashcode === other.hashcode) {
      return true;
    } else {
      return false;
    }
  }

  private getColumnIds(repeatedMeasures: Array<RepeatedMeasure>) {
    const cols = this.generateCombinations(repeatedMeasures)
    return cols;
  }

  private getRow(rowId: Array<CombinationId>, colIds: Array<CombinationId>): Array<ISUFactorCombination> {
    const row = new Array<ISUFactorCombination>();
    if (colIds.length > 0) {
      colIds.forEach(col => {
        const id = [this.tableId.id[0]].concat(rowId, col)
        row.push( new ISUFactorCombination(id, 1))
      })
    } else {
      const id = [this.tableId.id[0]].concat(rowId)
      row.push(new ISUFactorCombination(id, 1));
    }
    return row;
  }

  private getRows(predictors: Array<Predictor>, colIds: Array<CombinationId>) {
    const rowsIds = this.generateCombinations(predictors);
    rowsIds.forEach( rowId => {
      this.table.push(this.getRow(rowId.id, colIds));
    });
  }

  generateCombinations(factorList: Array<ISUFactor>): Array<ISUFactorCombination> {
    let combinations = new Array<ISUFactorCombination>();

    if (!isNullOrUndefined(factorList) && factorList.length > 0) {
      let factors = new Array<ISUFactor>();
      factorList.forEach( factor => {
        if (factor.inHypothesis) {
          factors.push(factor);
        }
      });
      factors = this.assignChildren(factors);
      combinations = factors[0].mapCombinations();
    }
    return combinations
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
}
