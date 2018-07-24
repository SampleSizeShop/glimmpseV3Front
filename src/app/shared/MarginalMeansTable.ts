import {ISUFactorCombinationTable} from './ISUFactorCombinationTable';
import {ISUFactorCombination} from './ISUFactorCombination';
import {CombinationId} from './CombinationId';
import {ISUFactors} from './ISUFactors';
import {isNullOrUndefined} from 'util';
import {RepeatedMeasure} from './RepeatedMeasure';
import {constants} from './constants';


export class MarginalMeansTable extends ISUFactorCombinationTable {
  constructor(tableId?: ISUFactorCombination, table?: Array<Array<ISUFactorCombination>>) {
    super(tableId, table);
  }

  populateTable(factors: ISUFactors) {
    this.table = [];
    const colIds = this.getColumnIds(factors.repeatedMeasures);
    if (!isNullOrUndefined(factors.predictors) && factors.predictors.length > 0) {
      factors.predictors.forEach( predictor => {
        predictor.valueNames.forEach( value => {
          const rowId = new CombinationId(name, constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, value);
          this.table.push(this.getRow(rowId, colIds));
        })
      });
    } else {
      this.table.push(this.getRow(null, colIds));
    }
    const a = 1;
  }

  getDimensions() {
   // fill in
  }

  getRowLabel() {
    // fill in
  }

  getColLabel() {
    // fill in
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

  private getColumnIds(repeatedMeasures: Array<RepeatedMeasure>) {
    const cols = new Array<CombinationId>();
    if (!isNullOrUndefined(repeatedMeasures) && repeatedMeasures.length > 0) {
      repeatedMeasures.forEach(measure => {
        measure.valueNames.forEach(val => {
          cols.push(new CombinationId(measure.name, constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE, val));
        })
      })
    }
    return cols;
  }
}
