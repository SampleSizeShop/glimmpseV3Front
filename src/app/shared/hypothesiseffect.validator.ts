import {AbstractControl, ValidatorFn} from '@angular/forms';
import {HypothesisEffect} from './HypothesisEffect';
import {HypothesisEffectVariable} from './HypothesisEffectVariable';
import {isNullOrUndefined} from 'util';

export function hypothesisEffectValidator(
  effect: HypothesisEffect,
  variables: HypothesisEffectVariable[]
): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const val = control.value;
    let possibleEffect = true;
    if (!isNullOrUndefined(effect) && !isNullOrUndefined(variables) && !isNullOrUndefined(effect.variables)) {
      effect.variables.forEach(variable => {
        if (variables.indexOf(variable) === -1) {
          possibleEffect = false;
        }
      });
    }
    if ( !possibleEffect ) {
      return {'impossibleeffect': val};
    } else {
      return null;
    }
  }
}
