import {NGXLogger} from 'ngx-logger';
import {AbstractControl, ValidatorFn} from '@angular/forms';

export function minMaxValidator(min: number, max: number, logger?: NGXLogger): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const val = control.value;
    if (val < min) {
      if (logger) {
        logger.debug('value is less than ' + min )
      }
      return { 'minval': val }
    } else if ( val > max ) {
      if (logger) {
        logger.debug('value greater less than max ' + max )
      }
      return { 'maxval': val }
    } else {
      return null;
    }
  }
}
