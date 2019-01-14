import {AbstractControl, ValidatorFn} from '@angular/forms';

export function relativeGroupSizeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const relativeGroupSize = control.value;
    if (relativeGroupSize < 0) {
      return {'minval': relativeGroupSize}
    }
    if (!Number.isInteger(relativeGroupSize)) {
      return {'notinteger': relativeGroupSize}
    }

    return null
  }
}
