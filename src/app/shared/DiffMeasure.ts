export class DiffMeasure {
  private _id: number;
  private _name: string;
  private _dimension: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

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
