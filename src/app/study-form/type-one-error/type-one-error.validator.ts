import {AbstractControl, ValidatorFn} from '@angular/forms';

export function typeOneErrorValidator(alphas: number[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    if (alphas.length < 1) {
      return {'noalpha': 'You must specify at least one Type I Error rate.'};

    return null;
  }
}
