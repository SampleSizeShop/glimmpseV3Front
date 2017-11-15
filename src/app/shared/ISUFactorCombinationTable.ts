import {ISUFactorCombination, CombinationId} from './ISUFactorCombination';
import {isNullOrUndefined} from 'util';

export class ISUFactorCombinationTable {
  private _table: Map<string, ISUFactorCombination>;
  private _rows: string[];
  private _cols: string[];
  private _rowDimension: string;
  private _colDimension: string;
  private _groupIdentifier: Array<CombinationId>;

  constructor(members: ISUFactorCombination[], tableDimensions: string[], groupName: CombinationId[]) {
    this.groupIdentifier = groupName
    this.populateTableDimensions(tableDimensions);
    this.populateTableandRowsAndColumns(members);
  }

  populateTableDimensions(tableDimensions: string []) {
    this.rowDimension = tableDimensions[0];
    this.colDimension = tableDimensions[1];
  }

  populateTableandRowsAndColumns(members: ISUFactorCombination[]) {
    this.table = new Map<string, ISUFactorCombination>();
    this.rows = [];
    this.cols = [];

    const rowSet = new Set<string>();
    const colSet = new Set<string>();
    members.forEach( member => {
      let row = null;
      let col = null;

      member.id.forEach( groupId => {
        if (groupId.id === this.rowDimension) {
          row = groupId
        }
        if ( groupId.id === this.colDimension ) {
          col = groupId
        }
      } );

      const key = new TableKey(row, col);
      this.table.set(key.toString(), member);
      if (row ) {rowSet.add( row.value ); }
      if (col) {colSet.add( col.value); }
    } );

    rowSet.forEach( val => {
      this.rows.push(val);
    } )
    colSet.forEach( val => {
      this.cols.push(val);
    } )
  }

  getMember(row: string, col: string): ISUFactorCombination {
    const key = new TableKey(
      new CombinationId( this.rowDimension, row ),
      new CombinationId(this.colDimension, col)
    );
    return this.table.get(key.toString());
  }

  get groupName() {
    let name = '';
    this.groupIdentifier.forEach( id => {
      name = name + ' ' + id.id + ':' + id.value;
    } );
    name = name.trim();
    return name;
  }

  hasCols() {
    if (isNullOrUndefined(this.cols) || (this.cols && this.cols.length === 0) ) {
      return false;
    }
    return true;
  }

  get table(): Map<string, ISUFactorCombination> {
    return this._table;
  }

  set table(value: Map<string, ISUFactorCombination>) {
    this._table = value;
  }

  get rows(): string[] {
    return this._rows;
  }

  set rows(value: string[]) {
    this._rows = value;
  }

  get cols(): string[] {
    return this._cols;
  }

  set cols(value: string[]) {
    this._cols = value;
  }

  get rowDimension(): string {
    return this._rowDimension;
  }

  set rowDimension(value: string) {
    this._rowDimension = value;
  }

  get colDimension(): string {
    return this._colDimension;
  }

  set colDimension(value: string) {
    this._colDimension = value;
  }

  get groupIdentifier(): CombinationId[] {
    return this._groupIdentifier;
  }

  set groupIdentifier(value: CombinationId[]) {
    this._groupIdentifier = value;
  }
}

class TableKey {
  row: CombinationId;
  col: CombinationId;

  toString() {
    let name = '';
    if (this.row) { name = name + this.row.id + this.row.value; }
    if ( !isNullOrUndefined(this.col)
      && !isNullOrUndefined(this.col.id)
      && !isNullOrUndefined(this.col.value)) { name = name + this.col.id + this.col.value; }
    return name;
  }

  constructor(row: CombinationId, col: CombinationId) {
    this.row = row;
    this.col = col;
  }
}
