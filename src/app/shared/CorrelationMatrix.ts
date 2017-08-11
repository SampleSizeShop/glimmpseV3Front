export class CorrelationMatrix {
  private _values: number[][];

  constructor() {
    this.values = [];
  }

  get values(): number[][] {
    return this._values;
  }

  set values(value: number[][]) {
    this._values = value;
  }

  populateDefaultValues(size: number) {
    const sizeArray =  Array.from(Array(size).keys());
    for (const r in sizeArray) {
      const row = []
      for (const c in sizeArray) {
        if (r === c) {
          row[c] = 1;
        } else {
          row[c] = 0;
        }
      }
      this.values[r] = row;
    }
  }
}
