import {HypothesisEffectVariable} from './HypothesisEffectVariable';
import {constants} from './constants';

export class RepeatedMeasure extends HypothesisEffectVariable {
  dimension: string;
  units: string;
  type: string;
  noRepeats: number;
  spacing: Array<number>;

  constructor(name?: string) {
    super(name);
    this.nature = constants.HYPOTHESIS_NATURE.BETWEEN;
    this.origin = constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR;

    this.dimension = '';
    this.units = '';
    this.type = '';
    this.noRepeats = 0;
    this.spacing = [];
  }
}
