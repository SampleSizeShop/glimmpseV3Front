import {AbstractControl, ValidatorFn} from '@angular/forms';

export function outcomeValidator(outcomes: string []): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const val = control.value;
    if (outcomes.indexOf(val) !== -1) {
      return { 'duplicate': val}
    } else {
      return null;
    }
  }
}
