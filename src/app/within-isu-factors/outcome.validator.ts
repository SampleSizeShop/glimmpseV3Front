import {AbstractControl, ValidatorFn} from '@angular/forms';

export function outcomeValidator(outcomes: string []): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const val = control.value;
    if (outcomes.indexOf(val) !== -1) {
      return { 'Value already exists in outcomes': val}
    } else {
      return null;
    }
  }
}
