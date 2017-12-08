import * as math from 'mathjs';
import Matrix = mathjs.Matrix;
import {constants} from './constants';

export class CMatrix {
  private _values: Matrix;
  private _type: string;
  name = '';

  constructor(type?: string) {
    this.values = math.matrix();
    if ( type ) {
      this.type = type;
    }
  }

  populateMainEffect(noGroups: number) {
    if (!Number.isInteger(noGroups)) {
      throw new Error('You have a fractional number of valueNames in your main effect. This is not a valid.');
    } else if (noGroups < 2) {
      throw Error('You have less than 2 valueNames in your main effect. This is not valid.');
    } else {
      const ident = math.diag(Array(noGroups - 1).fill(-1), 'dense');
      const vec  = math.ones([noGroups - 1, 1]);
      this.values = math.matrix(math.concat(vec, ident));
      console.log(this.values);
    }
  }

  populatePolynomialEvenSpacing(noGroups: number) {
    if (!Number.isInteger(noGroups)) {
      throw new Error('You have a fractional number of valueNames in your main effect. This is not a valid.');
    } else if (noGroups < 2) {
      throw Error('You have less than 2 valueNames in your main effect. This is not valid.');
    } else if (noGroups === 2) {
      this.values = math.matrix( constants.LINEAR_POLYNOMIAL_CMATRIX);
    } else if (noGroups === 3) {
      this.values = math.matrix( constants.QUADRATIC_POLYNOMIAL_CMATRIX);
    } else if (noGroups === 4) {
      this.values = math.matrix( constants.CUBIC_POLYNOMIAL_CMATRIX);
    } else if (noGroups === 5) {
      this.values = math.matrix( constants.QUINTIC_POLYNOMIAL_CMATRIX);
    } else if (noGroups === 6) {
      this.values = math.matrix( constants.SEXTIC_POLYNOMIAL_CMATRIX);
    } else {
      throw Error('You have more than 6 valueNames in your main effect. We don\'t currently handle this.');
    }
  }

  poopulateAverageMatrix(noGroups: number) {
    if (!Number.isInteger(noGroups)) {
      throw new Error('You have a fractional number of valueNames in your main effect. This is not a valid.');
    } else {
      this.values = math.matrix([Array(noGroups).fill( 1 / noGroups )] );
    }
  }

  populateIdentityMatrix(noGroups: number) {
    if (!Number.isInteger(noGroups)) {
      throw new Error('You have a fractional number of valueNames in your main effect. This is not a valid.');
    } else {
      this.values = math.diag(Array(noGroups).fill(1), 'dense');
    }
  }

  kronecker (next: CMatrix): Matrix {
    // return math.kron(this.values, next.values);
    return math.matrix([0]);
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

  get values(): Matrix {
    return this._values;
  }

  set values(value: Matrix) {
    this._values = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}
