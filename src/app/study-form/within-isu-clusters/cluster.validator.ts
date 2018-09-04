import {AbstractControl, ValidatorFn} from '@angular/forms';
import {ClusterLevel} from '../../shared/ClusterLevel';

export function clusterValidator(levels: ClusterLevel[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const val = control.value;
    const names = [];
    levels.forEach( level => {
      names.push(level.levelName);
    });
    if (names.indexOf(val) !== -1) {
      return { 'duplicate': val}
    } else {
      return null;
    }
  }
}
