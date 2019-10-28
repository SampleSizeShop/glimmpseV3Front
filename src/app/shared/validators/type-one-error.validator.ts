import {AbstractControl, ValidatorFn} from '@angular/forms';

export function typeOneErrorValidator(alphas: number[], isClickNext: {value: boolean}): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (isClickNext.value && alphas.length < 1) {
      return {'noalpha': 'You must specify at least one Type I error rate.'}
    };

    return null;
  }
}
