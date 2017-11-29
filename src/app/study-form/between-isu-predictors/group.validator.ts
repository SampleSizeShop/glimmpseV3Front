import {AbstractControl, ValidatorFn} from '@angular/forms';

export function groupValidator(groups: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const val = control.value;
    if (groups.indexOf(val) !== -1) {
      return { 'duplicate': val}
    } else {
      return null;
    }
  }
}
