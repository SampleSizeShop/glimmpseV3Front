import * as math from 'mathjs';
import Matrix = mathjs.Matrix;
import {isNull, isNullOrUndefined} from "util";

// A representation of CorrelationMatrix's data that can be converted to
// and from JSON without being altered.
interface CorrelationMatrixJSON {
  _values: Matrix;
  _type: string;
  name: string;
}

/**
 * Model class containing a mathjs Matrix.
 */
export class CorrelationMatrix {
  private _names: string[];
  private _values: Matrix;

  static parseMathJSMatrix(json) {
    if (!isNullOrUndefined(json.data)) {
      return math.matrix(json.data);
    } else {
      return null;
    }
  }

  // fromJSON is used to convert an serialized version
  // of the CorrelationMatrix to an instance of the class
  static fromJSON(json: CorrelationMatrixJSON|string): CorrelationMatrix {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, CorrelationMatrix.reviver);
    } else {
      // create an instance of the CorrelationMatrix class
      const matrix = Object.create(CorrelationMatrix.prototype);
      // copy all the fields from the json object
      return Object.assign(matrix, json, {
        // convert fields that need converting
        _values: this.parseMathJSMatrix(json._values),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call CorrelationMatrix.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? CorrelationMatrix.fromJSON(value) : value;
  }

  constructor(names?: string[]) {
    this.values = math.matrix();
    if (!isNullOrUndefined(names) && names.length > 0) {
      this.names = names;
      this.populateDefaultValues(names.length);
    }
  }

  get names(): string[] {
    return this._names;
  }

  set names(value: string[]) {
    this._names = value;
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
