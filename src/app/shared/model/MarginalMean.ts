import {ISUFactorCombination} from './ISUFactorCombination';
import {isNullOrUndefined} from 'util';
import {CombinationId} from './CombinationId';

export class MarginalMean extends ISUFactorCombination {
  constructor(id: Array<CombinationId>, value?: number) {
    super(id);
    if (!isNullOrUndefined(value)) {
      this.value = value;
    }
  }

  get value() {
    return this.value;
  }

  set value(value: number) {
    this.value = value;
  }
}
