import {ISUFactor} from './ISUFactor';
import {constants} from './constants';
import {PartialMatrix} from './PartialMatrix';
import {CorrelationMatrix} from './CorrelationMatrix';

export class RepeatedMeasure extends ISUFactor {
  units: string;
  type: string;
  private _noRepeats: number;
  partialUMatrix: PartialMatrix;
  correlationMatrix: CorrelationMatrix;

  constructor(name?: string) {
    super(name);
    this.nature = constants.HYPOTHESIS_NATURE.WITHIN ;
    this.origin = constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE;

    this.units = '';
    this.type = '';
    this._noRepeats = 0;
    this.partialUMatrix = new PartialMatrix(constants.C_MATRIX_TYPE.MAIN_EFFECT);
    this.correlationMatrix = new CorrelationMatrix(this.valueNames);
  }

  get noRepeats(): number {
    return this._noRepeats;
  }

  set noRepeats(value: number) {
    this._noRepeats = value;
    this.partialUMatrix.populateUMainEffect(value);
  }

  populatePartialMatrix() {
    if (this.isuFactorNature === constants.HYPOTHESIS_BETWEEN_NATURE.GLOBAL_TRENDS) {
      this.partialUMatrix.populateUMainEffect(this.noRepeats);
    } else if (this.isuFactorNature === constants.HYPOTHESIS_BETWEEN_NATURE.IDENTITY) {
      this.partialUMatrix.populateIdentityMatrix(this.noRepeats);
    } else if (this.isuFactorNature === constants.HYPOTHESIS_BETWEEN_NATURE.POLYNOMIAL) {
      this.partialUMatrix.populatePolynomialEvenSpacing(this.noRepeats);
    }
  }
}
