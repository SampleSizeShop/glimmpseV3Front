import * as math from 'mathjs';
import Matrix = mathjs.Matrix;
import {forEach} from '@angular/router/src/utils/collection';

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

  toTeX(): string {
    let texString = '$\\begin{bmatrix}';
    let row = 0;
    this.values.forEach(function (value, index, matrix) {
      if (index[0] > row) {
        row = index[0];
        texString = texString.slice(0, texString.length - 2) + '\\\\';
      }
      texString = texString + value + ' & '
    })
    texString = texString.slice(0, texString.length - 2) + '\\end{bmatrix}$';
    return texString;
  }
}
