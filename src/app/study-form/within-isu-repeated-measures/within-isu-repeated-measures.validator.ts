import {AbstractControl, ValidatorFn} from '@angular/forms';

export function WithinIsuRepeatedMeasuresValidator(isClickNext: {value: boolean}): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (isClickNext.value && ( control.value === '' || control.value === null )) {
      return {'required': 'You must specify a value.'}
    };

    return null;
  }
}
