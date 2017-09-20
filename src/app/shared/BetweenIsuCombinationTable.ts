import {BetweenIsuCombination, GroupId} from './BetweenIsuCombination';
import {isNullOrUndefined} from "util";

export class BetweenIsuCombinationTable {
  private _table: Map<string, BetweenIsuCombination>;
  private _rows: string[];
  private _cols: string[];
  private _rowDimension: string;
  private _colDimension: string;
  private _groupIdentifier: GroupId[];

  constructor(members: BetweenIsuCombination[], tableDimensions: string[], groupName: GroupId[]) {
    this.groupIdentifier = groupName
    this.populateTableDimensions(tableDimensions);
    this.populateTableandRowsAndColumns(members);
  }

  populateTableDimensions(tableDimensions: string []) {
    this.rowDimension = tableDimensions[0];
    this.colDimension = tableDimensions[1];
  }

  populateTableandRowsAndColumns(members: BetweenIsuCombination[]) {
    this.table = new Map<string, BetweenIsuCombination>();
    this.rows = [];
    this.cols = [];

    const rowSet = new Set<string>();
    const colSet = new Set<string>();
    members.forEach( member => {
      let row = null;
      let col = null;

      member.id.forEach( groupId => {
        if (groupId.predictor === this.rowDimension) {
          row = groupId
        }
        if ( groupId.predictor === this.colDimension ) {
          col = groupId
        }
      } );

      const key = new TableKey(row, col);
      this.table.set(key.toString(), member);
      if (row ) {rowSet.add( row.name ); }
      if (col) {colSet.add( col.name ); }
    } );

    rowSet.forEach( val => {
      this.rows.push(val);
    } )
    colSet.forEach( val => {
      this.cols.push(val);
    } )
  }

  getMember(row: string, col: string) {
    const key = new TableKey(
      new GroupId( this.rowDimension, row ),
      new GroupId(this.colDimension, col)
    );
    return this.table.get(key.toString());
  }

  get groupName() {
    let name = '';
    this.groupIdentifier.forEach( id => {
      name = name + ' ' + id.predictor + ':' + id.name;
    } );
    return name;
  }

  get table(): Map<string, BetweenIsuCombination> {
    return this._table;
  }

  set table(value: Map<string, BetweenIsuCombination>) {
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

  get groupIdentifier(): GroupId[] {
    return this._groupIdentifier;
  }

  set groupIdentifier(value: GroupId[]) {
    this._groupIdentifier = value;
  }
}

class TableKey {
  row: GroupId;
  col: GroupId;

  toString() {
    let name = '';
    if (this.row) { name = name + this.row.predictor + this.row.name; }
    if ( !isNullOrUndefined(this.col) && !isNullOrUndefined(this.col.predictor) && !isNullOrUndefined(this.col.name)) { name = name + this.col.predictor + this.col.name; }
    return name;
  }

  constructor(row: GroupId, col: GroupId) {
    this.row = row;
    this.col = col;
  }
}
