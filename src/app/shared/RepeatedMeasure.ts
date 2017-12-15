import {ISUFactor} from './ISUFactor';
import {constants} from './constants';
import {UMatrix} from './UMatrix';

export class RepeatedMeasure extends ISUFactor {
  units: string;
  type: string;
  private _noRepeats: number;
  partialUMatrix: UMatrix;

  constructor(name?: string) {
    super(name);
    this.nature = constants.HYPOTHESIS_NATURE.WITHIN ;
    this.origin = constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE;

    this.units = '';
    this.type = '';
    this._noRepeats = 0;
    this.partialUMatrix = new UMatrix(constants.C_MATRIX_TYPE.MAIN_EFFECT);
  }

  set noRepeats(value: number) {
    this._noRepeats = value;
    this.partialUMatrix.populateMainEffect(value);
  }
}
