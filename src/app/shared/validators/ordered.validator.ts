import {NGXLogger} from 'ngx-logger';
import {UntypedFormGroup, ValidatorFn} from '@angular/forms';
import {isNullOrUndefined} from 'util';

export function orderedValidator(names: number[], isCategorical: boolean,  log?: NGXLogger): ValidatorFn {
  return (group: UntypedFormGroup): {[key: string]: any} => {
    const values = [];
    for (const name of names) {
      if (!isNullOrUndefined(group.get(String(name)))) {
        values.push(Number(group.get(String(name)).value));
      }
    }
    const ordered  = [];
    values.forEach(v => {ordered.push(v)});
    ordered.sort((n1, n2) => n1 - n2);
    let isOrdered = true;
    ordered.forEach( (val, i) => {
      if (val !== values[i]) {
        isOrdered = false;
      }
    });
    if (isOrdered || isCategorical) {
      return null;
    } else {
      return {'ordered': 'Spacing values must be unique nonnegative integers.\n'};
    }
  }
}
