import {AbstractControl, ValidatorFn} from '@angular/forms';

export function smallestGroupSizeValidator(smallestGroupSize: number[], isClickNext: {value: boolean}): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (isClickNext.value && smallestGroupSize.length < 1) {
      return {'required': 'You must specify at least one value for smallest group size.'}
    };

    return null;
  }
}
