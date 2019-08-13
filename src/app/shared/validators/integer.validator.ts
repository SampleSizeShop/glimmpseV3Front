import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isNullOrUndefined} from 'util';

export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const val = control.value;
    if (isNullOrUndefined(val) || Number.isInteger(val)) {
      return null;
    } else {
      return { 'notint': val }
    }
  }
}
