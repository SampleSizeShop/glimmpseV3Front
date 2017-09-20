import {BetweenIsuCombination, GroupId} from './BetweenIsuCombination';

export class BetweenIsuCombinationTable {
  private _table: Map<TableKey, BetweenIsuCombination>;
  private _rows: string[];
  private _cols: string[];
  private _rowDimension: string;
  private _colDimension: string;
  private _groupIdentifier: GroupId[];

  constructor(members: BetweenIsuCombination[], tableDimensions: string[], groupName: GroupId[]) {
    this.groupIdentifier = groupName
    this.populateTableDimensions(tableDimensions);
    this.populateRowsAndColumns(members);
    this.populateTable(members);
  }

  populateTableDimensions(tableDimensions: string []) {
    this.rowDimension = tableDimensions[0];
    this.colDimension = tableDimensions[1];
  }

  populateRowsAndColumns(members: BetweenIsuCombination[]) {
    members.forEach( member => {
      member.id.forEach( predictor => {
        if (predictor.predictor === this.rowDimension) {
          this.rows.push( predictor.name );
        }
        if ( predictor.predictor === this.colDimension ) {
          this.cols.push( predictor.name );
        }
      } );
    } );
  }

  populateTable(members: BetweenIsuCombination[]) {
    this.table = new Map<TableKey, BetweenIsuCombination>();
    members.forEach( member => {
      let row = null;
      let col = null;

      member.id.forEach( predictor => {
        if (predictor.predictor === this.rowDimension ) {
          row = predictor
        }
        if (predictor.predictor === this.colDimension ) {
          col = predictor
        }
      });

      const key = new TableKey(row, col);
      this.table.set(key, member)
    });
  }

  getMember(row: string, col: string) {
    const key = new TableKey(
      new GroupId( this.rowDimension, row ),
      new GroupId(this.colDimension, col)
    );
    return this.table.get(key);
  }

  get groupName() {
    let name = '';
    this.groupIdentifier.forEach( id => {
      name = name + ' ' + id.predictor + ':' + id.name;
    } );
    return name;
  }

  get table(): Map<TableKey, BetweenIsuCombination> {
    return this._table;
  }

  set table(value: Map<TableKey, BetweenIsuCombination>) {
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

  constructor(row: GroupId, col: GroupId) {
    this.row = row;
    this.col = col;
  }
}
