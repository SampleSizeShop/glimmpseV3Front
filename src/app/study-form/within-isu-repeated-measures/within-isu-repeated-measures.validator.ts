import {AbstractControl, ValidatorFn} from '@angular/forms';

export function WithinIsuRepeatedMeasuresValidator(isClickNext: {value: boolean}): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (isClickNext.value && control.value === '') {
      return {'required': 'You must specify a name for this repeated measure dimension.'}
    };

    return null;
  }
}
