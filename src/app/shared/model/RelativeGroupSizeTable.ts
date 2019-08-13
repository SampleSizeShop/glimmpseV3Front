import {ISUFactorCombinationTable, ISUFactorCombinationTableJSON} from './ISUFactorCombinationTable';
import {ISUFactorCombination} from './ISUFactorCombination';
import {CombinationId} from './CombinationId';
import {isNullOrUndefined} from 'util';

interface RelativeGtroupSizeTableJSON extends ISUFactorCombinationTableJSON {
  dimensions: Array<CombinationId>,
}

export class RelativeGroupSizeTable extends ISUFactorCombinationTable {
  dimensions: Array<CombinationId>;

  static parseDimensions(json: RelativeGtroupSizeTableJSON) {
    const list = [];
    if (!isNullOrUndefined(json.dimensions)) {
      json.dimensions.forEach(combinationId => {
        list.push(CombinationId.fromJSON(JSON.stringify(combinationId)));
      });
      return list;
    } else {
      return null;
    }
  }

  // fromJSON is used to convert an serialized version
  // of the RelativeGroupSizeTable to an instance of the class
  static fromJSON(json: RelativeGtroupSizeTableJSON|string): RelativeGroupSizeTable {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, RelativeGroupSizeTable.reviver);
    } else {
      // create an instance of the RelativeGroupSizeTable class
      const isuFactors = Object.create(RelativeGroupSizeTable.prototype);
      // copy all the fields from the json object
      return Object.assign(isuFactors, json, {
        // convert fields that need converting
        dimensions: this.parseDimensions(json),
        table: this.parseTable(json),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call RelativeGroupSizeTable.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? RelativeGroupSizeTable.fromJSON(value) : value;
  }

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
      if (this.dimensions.length > 1) {
        element.id.forEach( factor => {
          if (factor.factorName === this.dimensions[1].factorName) {
            col = factor.order;
          }
        });
      } else {
        col = 0;
      }
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
        col.push(tableMap.get(i + '-' + j));
      }
      rows.push(col);
    }
    this.table = rows;
  }

  getDimensions(element: ISUFactorCombination): Array<CombinationId> {
    let dimensions = [];
    if (!isNullOrUndefined(element) && !isNullOrUndefined(element.id)) {
      if (isNullOrUndefined(this.tableId)) {
        dimensions = element.id
      } else {
        dimensions = element.id.filter( factor =>
          this.tableId.id.indexOf(factor) < 0);
      }
    }
    return dimensions;
  }

  getRowLabel(element: ISUFactorCombination): String {
    const label = this._getDimensionLabel(element, 0);
    return label;
  }

  getColLabel(element: ISUFactorCombination): String {
    let label = '';
    if (this.dimensions.length > 1) {
      label = this._getDimensionLabel(element, 1);
    }
    return label;
  }

  getCellLabel(element: ISUFactorCombination) {
    let label = '';
    label = this._getDimensionLabel(element, 0);
    if (this.dimensions.length > 1) {
      label = label + ', ' + this._getDimensionLabel(element, 1);
    }
    return label;
  }

  _getDimensionLabel(element: ISUFactorCombination, dimensionIndex: number) {
    const factorName = this.dimensions[dimensionIndex].factorName;
    let label = 'undefined';
    element.id.forEach( factor => {
      if (factorName === factor.factorName) {
        label = factorName + ': ' + factor.value;
      }
    });
    return label;
  }

  compareSizeAndDimensions(other: RelativeGroupSizeTable) {
    if (!isNullOrUndefined(other)
      && this.compareDimensions(other)
      && this.compareTableIds(other)
      && this.compareTableSize(other)
    ) {
      return true;
    } else {
      return false;
    }
  }

  compareDimensions(other: RelativeGroupSizeTable) {
    let i = 0;
    let compare = true;
    if (isNullOrUndefined(this.dimensions)) {
      compare = false;
    } else {
      this.dimensions.forEach( id => {
        if (
          !isNullOrUndefined(other.dimensions[i]
            && other.dimensions[i].equals(id)
          )
        ) {
          // do nothing
        } else {
          compare = false
        }
        i = i++;
      });
    }
    return compare;
  }
}
