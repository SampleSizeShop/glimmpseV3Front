import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {RepeatedMeasure} from '../../shared/model/RepeatedMeasure';

export function WithinIsuRepeatedMeasuresValidator(isClickNext: {value: boolean},
                                                   measures: Array<RepeatedMeasure>,
                                                   editing?: RepeatedMeasure): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (isClickNext.value && ( control.value === '' || control.value === null )) {
      return {'required': 'You must specify a value.'}
    };

    const names = [];
    measures.forEach( measure => {
      names.push(measure.name);
    });

    const val = control.value;
    function editingNameCheck(edit: RepeatedMeasure, name: any) {
      if (!isNullOrUndefined(edit) && edit.name === name) {
        return false;
      }
      return true;
    }

    if (names.indexOf(val) !== -1 && editingNameCheck(editing, val)) {
      return { 'duplicate': 'You have already specified this repeated measure dimension'};
    }

    return null;
  }
}
