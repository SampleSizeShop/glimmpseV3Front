import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Outcome} from '../../shared/model/Outcome';

export function outcomeValidator(outcomes: Outcome[], isClickNext: {value: boolean}): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const val = control.value;
    const names = [];
    outcomes.forEach(outcome => {
      names.push(outcome.name);
    });

    if (isClickNext.value && outcomes.length < 1) {
      return {'nooutcome': 'Need an outcome to go to next step.'};
    }

    if (names.indexOf(val) !== -1) {
      return {'duplicate': val};
    }

    return null;
  }
}
