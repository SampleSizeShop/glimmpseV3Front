import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Outcome} from '../shared/Outcome';

export function outcomeValidator(outcomes: Outcome[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const val = control.value;
    const names = [];
    outcomes.forEach( outcome => {
      names.push(outcome.name);
    });
    if (names.indexOf(val) !== -1) {
      return { 'duplicate': val}
    } else {
      return null;
    }
  }
}
