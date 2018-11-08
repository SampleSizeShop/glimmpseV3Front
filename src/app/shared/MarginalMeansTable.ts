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
    const colIds = this.getColumnIds(factors);
    if (factors.predictorsInHypothesis.length > 0) {
      this.getRows(factors, colIds);
    } else {
      this.table.push(this.getRow([new CombinationId('', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '', 0)], colIds));
    }
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

  getCellLabel(element: ISUFactorCombination) {
    let label = '';
    label = this.getRowLabel(element);
    label = label + ', ' + this.getColLabel(element);
    return label;
  }

  compareSizeAndDimensions(other: MarginalMeansTable) {
    if (this.hashcode === other.hashcode) {
      return true;
    } else {
      return false;
    }
  }

  private getColumnIds(factors: ISUFactors) {
    const cols = factors.generateCombinations(factors.repeatedMeasuresInHypothesis)
    return cols;
  }

  private getRow(rowId: Array<CombinationId>, colIds: Array<ISUFactorCombination>): Array<ISUFactorCombination> {
    const row = new Array<ISUFactorCombination>();
    if (colIds.length > 0) {
      colIds.forEach(col => {
        const id = [this.tableId.id[0]].concat(rowId, col.id)
        row.push( new ISUFactorCombination(id, 1))
      })
    } else {
      const id = [this.tableId.id[0]].concat(rowId)
      row.push(new ISUFactorCombination(id, 1));
    }
    return row;
  }

  private getRows(factors: ISUFactors, colIds: Array<ISUFactorCombination>) {
    const rowsIds = factors.generateCombinations(factors.predictorsInHypothesis);
    rowsIds.forEach( rowId => {
      this.table.push(this.getRow(rowId.id, colIds));
    });
  }

  get size() {
    let size = null;
    if (!isNullOrUndefined(this.table)) {
      size = this.table.length * this.table[0].length;
    }
    return size;
  }
}
