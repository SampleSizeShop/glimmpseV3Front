import {ISUFactorCombination} from './ISUFactorCombination';
import {isNullOrUndefined} from 'util';
import {CombinationId} from './CombinationId';

export class Group extends ISUFactorCombination {
  constructor(id: Array<CombinationId>, relativeGroupSize?: number) {
    super(id);
    if (!isNullOrUndefined(relativeGroupSize)) {
      this.relativeGroupSize = relativeGroupSize;
    }
  }

  get relativeGroupSize() {
    return this.value;
  }

  set relativeGroupSize(size: number) {
    this.value = size;
  }
}
