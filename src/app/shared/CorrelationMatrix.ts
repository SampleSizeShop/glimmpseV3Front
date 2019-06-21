import * as math from 'mathjs';
import Matrix = mathjs.Matrix;
import {isNull, isNullOrUndefined} from 'util';

// A representation of CorrelationMatrix's data that can be converted to
// and from JSON without being altered.
interface CorrelationMatrixJSON {
  _values: Matrix;
  _type: string;
  name: string;
  lear: boolean,
  base: number,
  decay: number,
  scaled: boolean
}

/**
 * Model class containing a mathjs Matrix.
 */
export class CorrelationMatrix {
  private _names: string[];
  private _values: Matrix;

  public lear = false;
  public base;
  public decay;
  public scaled;

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

  constructor(names?: string[],
              lear?: boolean,
              base?: number,
              decay?: number,
              scaled?: boolean) {
    this.values = math.matrix();
    if (!isNullOrUndefined(names) && names.length > 0) {
      this.names = names;
      this.populateDefaultValues(names.length);
    }
    if (!isNullOrUndefined(lear)) {
      this.lear = lear;
    } else {
      this.lear = false;
    }
    if (!isNullOrUndefined(base)) {
      this.base = base;
    } else {
      this.base = 0.5
    }
    if (!isNullOrUndefined(decay)) {
      this.decay = decay;
    } else {
      this.decay = 0.3;
    }
    if (!isNullOrUndefined(scaled)) {
      this.scaled = scaled;
    } else {
      this.scaled = true;
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
   * Calculate values for a lear corellation using a base value and decay according to
   *
   * @param {number} base
   * @param {number} decay
   * @param {boolean} scaled
   */
  calculateLear(base?: number, decay?: number, scaled?: boolean) {
    const levels = [];

    let dMin = 1;
    let dMax = 1;
    let scale = 1;
    if (isNullOrUndefined(base)) {
      base = this.base;
    }
    if (isNullOrUndefined(decay)) {
      decay = this.decay;
    }
    if (isNullOrUndefined(scaled)) {
      scaled = this.scaled;
    }

    if ( this._isNumeric()
      && !isNullOrUndefined(base)
      && !isNullOrUndefined(decay)) {
      this.names.forEach(
        val => {
          levels.push(Number.parseFloat(val));
        }
      );
      dMin = this._calcDmin(levels);
      dMax = this._calcDMax(levels);

      if (!isNullOrUndefined(scaled) && scaled) {
        scale = dMin;
      }

      const vals = this.values.clone();
      for ( let r = 0; r < vals.size()[0]; r++ ) {
        for (let c = 0; c < vals.size()[1]; c++ ) {
          if (r === c ) { vals.set([r, c],  1); }
          if (r > c  && dMin === dMax ) {
            vals.set([r, c], base);
            vals.set([c, r], base);
          }
          if (r > c  && dMin !== dMax ) {
            const rho_j_k =  Math.pow(base,
              dMin / scale + decay * (((levels[r] - levels[c]) - dMin) / (dMax - dMin)));
            vals.set([r, c], rho_j_k );
            vals.set([c, r], rho_j_k );
          }
        }
      }

      this.values = vals;
    }
  }

  /**
   * Private method used in lear calculation.
   *
   * @param levels
   * @returns {any}
   * @private
   */
  _calcDmin(levels) {
    let min = null;
    for (let i = 0; i < levels.length; i++) {
      const a = levels[i];
      for (let j = 0; j < levels.length; j++) {
        if (i !== j) {
          const b = levels[j];
          const test = Math.abs(a - b);
          if (isNull(min) || test < min) {
            min = test;
          }
        }
      }
    }
    return min;
  }

  /**
   * Private method used in lear calculatiom
   *
   * @param levels
   * @returns {number}
   * @private
   */
  _calcDMax(levels) {
    return Math.max.apply(null, levels) - Math.min.apply(null, levels);
  }


  /**
   * Is this correlation matrix for a numeric repeated measure?
   *
    * @returns {boolean}
   * @private
   */
  _isNumeric() {
    let isNumeric = true;
    if (!isNullOrUndefined(this.names)) {
      this.names.forEach(
        value => {
          if ( isNaN(Number.parseFloat(value))) {
            isNumeric = false;
          }
        });
    } else {
      isNumeric = false;
    }
    return isNumeric;
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
