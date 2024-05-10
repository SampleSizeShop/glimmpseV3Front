import {UntypedFormGroup, ValidatorFn} from '@angular/forms';

export function relativeGroupSizeValidator(): ValidatorFn {
  return (fb: UntypedFormGroup): {[key: string]: any} => {
    const relativeGroupSizeArray = [];
    const controls = fb.controls;

    for (const key of Object.keys(controls)) {
      relativeGroupSizeArray.push(controls[key].value);
    }

    if (relativeGroupSizeArray.includes(null)) {
      return {'required': true}
    }

    if (Math.min(...relativeGroupSizeArray) < 1) {
      return {'minval': true}
    }

    if (!relativeGroupSizeArray.includes(1)) {
      return {'notcontainone': true}
    }

    return null
  }
}
