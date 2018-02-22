import * as math from 'mathjs';
import Matrix = mathjs.Matrix;

/**
 * Model class containing a mathjs Matrix.
 */
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

  /**
   * Populate as a diagonal square matrix of size: size.
   * @param {number} size size of square matrix
   */
  populateDefaultValues(size: number): void {
    this.values = math.diag(Array(size).fill(1), 'dense');
  }

  /**
   * @returns {string} TeX formatted string representation of Matrix values.
   */
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
