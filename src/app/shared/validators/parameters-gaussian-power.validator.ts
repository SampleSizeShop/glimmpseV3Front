import {UntypedFormGroup, ValidatorFn} from '@angular/forms';

export function gaussianPowerValidator(quantiles, isClickNext): ValidatorFn {
  return (fb: UntypedFormGroup): {[key: string]: any} => {
    const controls = fb.controls;
    if (isClickNext.value) {
      if (!controls['quantilePower'].value && !controls['unconditionalPower'].value) {
        return {'required': true};
      }

      if (controls['quantilePower'].value && quantiles.size < 1) {
        return {'minlength': true}
      }
    }
    return null
  }
}
