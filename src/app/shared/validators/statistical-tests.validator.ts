import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Outcome} from '../model/Outcome';

export function statisticalTestsValidator(selectedTests: string[], isClickNext: {value: boolean}): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!selectedTests && isClickNext) {
      return {'notestselected': 'Need to choose one test to go to next step.'};
    }
    if (selectedTests.length < 1 && isClickNext) {
      return {'notestselected': 'Need to choose one test to go to next step.'};
    }

    return null;
  }
}
