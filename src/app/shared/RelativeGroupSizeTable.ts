import {ISUFactorCombinationTable} from './ISUFactorCombinationTable';
import {ISUFactorCombination} from './ISUFactorCombination';
import {CombinationId} from './CombinationId';
import {isNullOrUndefined} from "util";

export class RelativeGroupSizeTable extends ISUFactorCombinationTable {
  dimensions: Array<CombinationId>;
  constructor(tableId?: ISUFactorCombination, table?: Array<Array<ISUFactorCombination>>) {
    super(tableId, table);
  }

  populateTable(groups: Array<ISUFactorCombination>) {
    const elements = [];
    const tableMap = new Map<string, ISUFactorCombination>();
    let rowLength = -1;
    let colLength = -1;
    groups.forEach( group => {
      if (this.inTable(group)) {
        elements.push(group);
      }
    });
    this.dimensions = this.getDimensions(elements[0]);
    // read elements into map stored by location
    // then use map to populate array of arrays
    elements.forEach(element => {
      let row = -1;
      let col = -1;
      element.id.forEach( factor => {
        if (factor.factorName === this.dimensions[0].factorName) {
          row = factor.order;
        }
      });
      element.id.forEach( factor => {
        if (factor.factorName === this.dimensions[1].factorName) {
          col = factor.order;
        }
      });
      tableMap.set(row.toString() + '-' + col.toString(), element)
      if (row > rowLength) {rowLength = row; }
      if (col > colLength) {colLength = col; }
    });
    rowLength++;
    colLength++;

    const rows = [];
    for (let i = 0; i < rowLength; i++) {
      const col = [];
      for (let j = 0;j < colLength; j++) {
        col.push(tableMap.get(j + '-' + i));
      }
      rows.push(col);
    }
    this.table = rows;
  }

  getDimensions(element: ISUFactorCombination): Array<CombinationId> {
    let dimensions = [];
    if (isNullOrUndefined(this.tableId)) {
      dimensions = element.id
    } else {
      dimensions = element.id.filter( factor =>
        this.tableId.id.indexOf(factor) < 0);
    }
    return dimensions;
  }
}
