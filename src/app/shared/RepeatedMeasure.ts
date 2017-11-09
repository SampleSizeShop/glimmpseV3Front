import {ISUFactor} from './ISUFactor';
import {constants} from './constants';

export class RepeatedMeasure extends ISUFactor {
  units: string;
  type: string;
  noRepeats: number;

  constructor(name?: string) {
    super(name);
    this.nature = constants.HYPOTHESIS_NATURE.WITHIN ;
    this.origin = constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE;

    this.units = '';
    this.type = '';
    this.noRepeats = 0;
  }
}
