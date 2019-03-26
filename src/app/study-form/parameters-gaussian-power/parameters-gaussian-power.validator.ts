import {FormGroup, ValidatorFn} from '@angular/forms';

export function gaussianPowerValidator(quantiles): ValidatorFn {
  return (fb: FormGroup): {[key: string]: any} => {
    const controlArray = [];
    const controls = fb.controls;

    if (!controls['quantilePower'].value && !controls['unconditionalPower'].value) {
      return {'required': true};
    }

    if (controls['quantilePower'].value && quantiles.size < 1) {
      return {'minlength' : true}
    }

    return null
  }
}
