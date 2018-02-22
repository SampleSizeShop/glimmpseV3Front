import {NGXLogger} from 'ngx-logger';
import {AbstractControl, ValidatorFn} from '@angular/forms';

export function minMaxValidator(min: number, max: number, log?: NGXLogger): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const val = control.value;
    if (val < min) {
      if (log) {
        log.debug('value is less than ' + min )
      }
      return { 'minval': val }
    } else if ( val > max ) {
      if (log) {
        log.debug('value greater less than max ' + max )
      }
      return { 'maxval': val }
    } else {
      return null;
    }
  }
}
