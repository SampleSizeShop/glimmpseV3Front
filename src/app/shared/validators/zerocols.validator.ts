import {NGXLogger} from 'ngx-logger';
import {UntypedFormGroup, ValidatorFn} from '@angular/forms';
import {constants} from '../model/constants';
import {isNullOrUndefined} from 'util';
import Matrix = mathjs.Matrix;
import * as math from 'mathjs';

/** Validator function which takes a Math.js matrix and returns an error if we have a columns of zeroes**/
export function zeroColsValidator(matrix: Matrix, log?: NGXLogger): ValidatorFn {
  return (group: UntypedFormGroup): {[key: string]: any} => {
    if (!isNullOrUndefined(group) && !isNullOrUndefined(group.controls)) {
      Object.keys(group.controls).forEach(name => {
        const element = splitName(name);
        matrix.set(element, group.get(name).value);
      });
    }
    let zeroCol = false;
    const dimensions = matrix.size();
    for (let c = 0; c < dimensions[1]; c++) {
      let count = 0;
      for (let r = 0; r < dimensions[0]; r++) {
        count = count + math.abs(matrix.get([r, c]));
      }
      if (count === 0) {
        zeroCol = true;
      }
    }
    if (zeroCol) {
      if (log) {
        log.debug('Cannot have a column of zeroes');
      }
      return {'zeroCol': 'Cannot have a column of zeroes'};
    } else {
      return null;
    }
  }
}

function splitName(name: string) {
  const loc =  name.split(constants.SEPARATOR);
  return [+loc[0], +loc[1]];
}
