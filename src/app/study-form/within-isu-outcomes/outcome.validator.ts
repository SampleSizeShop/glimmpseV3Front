import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Outcome} from '../../shared/Outcome';

export function outcomeValidator(outcomes: Outcome[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const val = control.value;
    const names = [];
    outcomes.forEach(outcome => {
      names.push(outcome.name);
    });
    const validResultContainer = {};
    if (names.indexOf(val) !== -1) {
      // return { 'duplicate': val }
      validResultContainer['duplicate'] = val;
    } else if (outcomes.length < 1) {
      validResultContainer['nooutcome'] = 'Need an outcome to go to next step.';
    }
    if (validResultContainer) {
      return validResultContainer;
    } else {
      return null;
    }
  }
}
