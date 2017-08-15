import * as math from 'mathjs';
import Matrix = mathjs.Matrix;

export class CorrelationMatrix {
  private _values: Matrix;

  constructor() {
    this.values = math.matrix();
  }

  get values(): Matrix {
    return this._values;
  }

  set values(value: Matrix) {
    this._values = value;
  }

  populateDefaultValues(size: number): void {
    this.values = math.diag(Array(size).fill(1), 'dense');
  }
}
