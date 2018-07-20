import {ISUFactorCombination} from './ISUFactorCombination';
import {isNullOrUndefined} from 'util';

export class ISUFactorCombinationTable {
  private _table: Array<Array<ISUFactorCombination>>;
  private _tableId: ISUFactorCombination;

  constructor(tableId: ISUFactorCombination, table?: Array<Array<ISUFactorCombination>>) {
    this.tableId = tableId;
    if (!isNullOrUndefined(table)) {
      this.table = table;
    }
  }

  inTable(element: ISUFactorCombination): Boolean {
    if (isNullOrUndefined(this.tableId)) {
      return true;
    }
    let include = true;
    element.id.forEach(elementId => {
      this.tableId.id.forEach( tableIdElement => {
        if ( (elementId.factorName === tableIdElement.factorName) && !(elementId.value === tableIdElement.value) ) {
          include = false;
        }
      });
    });
    return include;
  }

  get controlDefs() {
    const controlDefs = {};
    let c = 0;
    this.table.forEach(col => {
      let r = 0;
      col.forEach( row => {
        const name = r.toString() + '-' + c.toString();
        controlDefs[name] = [this.table[c][r].value];
        r++;
      });
      c++;
    })
    return controlDefs;
  }

  get table(): Array<Array<ISUFactorCombination>> {
    return this._table;
  }

  set table(value: Array<Array<ISUFactorCombination>>) {
    this._table = value;
  }

  get tableId(): ISUFactorCombination {
    return this._tableId;
  }

  set tableId(value: ISUFactorCombination) {
    this._tableId = value;
  }
}
