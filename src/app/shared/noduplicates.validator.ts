import {NGXLogger} from 'ngx-logger';
import {FormGroup, ValidatorFn} from '@angular/forms';
import {isNullOrUndefined} from 'util';

export function noDuplicatesValidator(names: number[], log?: NGXLogger): ValidatorFn {
  return (group: FormGroup): {[key: string]: any} => {
    const values = [];
    for (const name of names) {
      if (!isNullOrUndefined(group.get(String(name)))) {
        values.push(group.get(String(name)).value);
      }
    }
    const set = new Set(values);
    if (set.size < values.length) {
      if (log) {
        log.debug('Cannot have duplicate values');
      }
      return {'duplicates': 'Cannot have duplicate values'};
    } else {
      return null;
    }
  }
}
