import {AbstractControl, ValidatorFn} from '@angular/forms';
import {ClusterLevel} from '../../shared/model/ClusterLevel';

export function clusterValidator(isuName: string, levels: ClusterLevel[], editingLevel: boolean): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const val = control.value;
    const names = [];
    levels.forEach( level => {
      names.push(level.levelName);
    });
    names.push(isuName)
    if (!editingLevel && names.indexOf(val) !== -1) {
      return { 'duplicate': val}
    } else {
      return null;
    }
  }
}
