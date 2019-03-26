import {FormGroup, ValidatorFn} from '@angular/forms';

export function gaussianPowerValidator(): ValidatorFn {
  return (fb: FormGroup): {[key: string]: any} => {
    const relativeGroupSizeArray = [];
    const controls = fb.controls;

    for (const key of Object.keys(controls)) {
      relativeGroupSizeArray.push(controls[key].value);
    }

    return null
  }
}
