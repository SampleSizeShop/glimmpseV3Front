import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {Predictor} from "../shared/Predictor";

export function predictorValidator(predictors: Array<Predictor>): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const names = [];
    predictors.forEach( predictor => {
      names.push(predictor.name);
    });
    const val = control.value;
    if ( isNullOrUndefined(val) || val === '' ) {
      return { 'empty': val}
    }
    if (names.indexOf(val) !== -1) {
      return { 'duplicate': val}
    } else {
      return null;
    }
  }
}
