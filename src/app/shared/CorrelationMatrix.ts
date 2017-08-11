export class CorrelationMatrix {
  private _values: number[][];

  get values(): number[][] {
    return this._values;
  }

  set values(value: number[][]) {
    this._values = value;
  }
}
