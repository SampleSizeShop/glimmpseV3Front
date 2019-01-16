import {ISUFactorCombination} from './ISUFactorCombination';
import {isNullOrUndefined} from 'util';

export interface ISUFactorCombinationTableJSON {
  _table: Array<Array<ISUFactorCombination>>;
  _tableId: ISUFactorCombination;
}

export class ISUFactorCombinationTable {
  private _table: Array<Array<ISUFactorCombination>>;
  private _tableId: ISUFactorCombination;

  static parseTable(json: ISUFactorCombinationTableJSON) {
    if (!isNullOrUndefined(json._table)) {
      const tab = []
      json._table.forEach( row => {
        const r = [];
        row.forEach(col => {
          r.push(ISUFactorCombination.fromJSON(col));
        });
        tab.push(r);
      });
      return tab;
    } else {
      return null;
    }
  }

  // fromJSON is used to convert an serialized version
  // of the ISUFactors to an instance of the class
  static fromJSON(json: ISUFactorCombinationTableJSON|string): ISUFactorCombinationTable {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, ISUFactorCombinationTable.reviver);
    } else {
      // create an instance of the StudyDesign class
      const table = Object.create(ISUFactorCombinationTable.prototype);
      // copy all the fields from the json object
      return Object.assign(table, json, {
        // convert fields that need converting
        table: this.parseTable(json),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call ISUFactorCombinationTable.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? ISUFactorCombinationTable.fromJSON(value) : value;
  }

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
    let r = 0;
    this.table.forEach(row => {
      let c = 0;
      row.forEach( col => {
        const name = r.toString() + '-' + c.toString();
        controlDefs[name] = [this.table[r][c].value];
        c++;
      });
      r++;
    })
    return controlDefs;
  }

  compareTableIds(other: ISUFactorCombinationTable) {
    let compare = false;
    if (isNullOrUndefined(this.tableId) && isNullOrUndefined(other.tableId)) {
      compare = true;
    } else if (!isNullOrUndefined(this.tableId) && !isNullOrUndefined(other.tableId)) {
      if (this.tableId.name === other.tableId.name) {
        compare = true;
      }
    }
    return compare;
  }

  compareTableSize(other: ISUFactorCombinationTable) {
    let compare = false;
    if (isNullOrUndefined(this.table) && isNullOrUndefined(other.table)) {
      compare = true;
    } else if (!isNullOrUndefined(this.table) && !isNullOrUndefined(other.table)) {
      if (this.table.length === other.table.length) {
        let i = 0;
        this.table.forEach( row => {
          if (row.length === other.table[i].length) {
            compare = true;
          }
          i = i++;
        });
      }
    }
    return compare;
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

  get name(): string {
    let name = '';
    if (!isNullOrUndefined(this.tableId)) {
      name = this.tableId.name;
    }
    if (name.charAt(name.length - 1) === ',') {
      name = name.substring(0, name.length - 1);
    }
    if (name.charAt(name.length - 1) === ':') {
      name = name.substring(0, name.length - 1);
    }
    return name;
  }
}
