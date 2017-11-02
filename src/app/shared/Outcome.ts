import {HypothesisEffectVariable} from './HypothesisEffectVariable';
import {constants} from './constants';

export class Outcome extends HypothesisEffectVariable {
  constructor(name: string ) {
    super(name);
    this.nature = constants.HYPOTHESIS_NATURE.WITHIN;
    this.origin = constants.HYPOTHESIS_ORIGIN.OUTCOME;
  }
}
