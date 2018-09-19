import {AbstractControl, ValidatorFn} from '@angular/forms';
import {Outcome} from '../../shared/Outcome';

export function statisticalTestsValidator(selectedTests: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!selectedTests) {
      return {'notest': 'Need to choose one test to go to next step.'};
    }
    if (selectedTests.length < 1) {
      return {'notest': 'Need to choose one test to go to next step.'};
    }

    return null;
  }
}
