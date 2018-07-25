import {ISUFactorCombinationTable} from './ISUFactorCombinationTable';
import {ISUFactorCombination} from './ISUFactorCombination';
import {CombinationId} from './CombinationId';
import {ISUFactors} from './ISUFactors';
import {isNullOrUndefined} from 'util';
import {RepeatedMeasure} from './RepeatedMeasure';
import {constants} from './constants';
import {Predictor} from './Predictor';
import {ISUFactor} from "./ISUFactor";


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
        label = factor.factorName + ' : ' + factor.value;
      }
    });
    return label;
  }

  getColLabel(element: ISUFactorCombination) {
    let label = '';
    element.id.forEach( factor => {
      if (factor.factorType === constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE) {
        label = factor.factorName + ' : ' + factor.value;
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
    const cols = new Array<CombinationId>();
    if (!isNullOrUndefined(repeatedMeasures) && repeatedMeasures.length > 0) {
      repeatedMeasures.forEach(measure => {
        if (measure.inHypothesis) {
          measure.valueNames.forEach(val => {
            cols.push(new CombinationId(measure.name, constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE, val));
          });
        }
      });
    }
    return cols;
  }

  private getRow(rowId: CombinationId, colIds: Array<CombinationId>): Array<ISUFactorCombination> {
    const row = new Array<ISUFactorCombination>();
    if (colIds.length > 0) {
      colIds.forEach(col => {
        row.push( new ISUFactorCombination([this.tableId.id[0], rowId, col], 1))
      })
    } else {
      row.push(new ISUFactorCombination([this.tableId.id[0], rowId], 1));
    }
    return row;
  }

  private getRows(predictors: Array<Predictor>, colIds: Array<CombinationId>) {
    predictors.forEach(predictor => {
      if (predictor.inHypothesis) {
        predictor.valueNames.forEach(value => {
          const rowId = new CombinationId(predictor.name, constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, value);
          this.table.push(this.getRow(rowId, colIds));
        });
      }
    });
  }
}
