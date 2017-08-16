export class DiffMeasure {
  private _name: string;
  private _dimension: number;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get dimension(): number {
    return this._dimension;
  }

  set dimension(value: number) {
    this._dimension = value;
  }
}
