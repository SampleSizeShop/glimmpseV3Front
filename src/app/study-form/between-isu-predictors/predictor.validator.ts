import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {Predictor} from '../../shared/model/Predictor';

export function predictorValidator(predictors: Array<Predictor>, editing?: Predictor): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const names = [];
    predictors.forEach( predictor => {
      names.push(predictor.name);
    });
    const val = control.value;
    if ( isNullOrUndefined(val) || val === '' ) {
      return { 'empty': val}
    }

    function editingNameCheck(edit: Predictor, name: any) {
      if (!isNullOrUndefined(edit) && edit.name === name) {
        return false;
      }
      return true;
    }

    if (names.indexOf(val) !== -1 && editingNameCheck(editing, val)) {
      return { 'duplicate': val}
    } else {
      return null;
    }
  }
}
