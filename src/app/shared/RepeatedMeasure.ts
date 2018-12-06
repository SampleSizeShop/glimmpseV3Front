import {ISUFactor, ISUFactorJSON} from './ISUFactor';
import {constants} from './constants';
import {PartialMatrix} from './PartialMatrix';
import {CorrelationMatrix} from './CorrelationMatrix';
import {isNullOrUndefined} from 'util';

interface RepeatedMeasureJSON extends ISUFactorJSON {
  units: string;
  type: string;
  _noRepeats: number;
  partialUMatrix: PartialMatrix;
  correlationMatrix: CorrelationMatrix;
  standard_deviations: Array<number>;
}

export class RepeatedMeasure extends ISUFactor {
  units: string;
  type: string;
  private _noRepeats: number;
  partialUMatrix: PartialMatrix;
  correlationMatrix: CorrelationMatrix;
  standard_deviations: Array<number>;

  static parsePartialUMatrix(json: RepeatedMeasureJSON) {
    if (!isNullOrUndefined(json.partialUMatrix)) {
      return PartialMatrix.fromJSON(JSON.stringify(json.partialUMatrix))
    } else {
      return null;
    }
  }

  static parseCorrelationMatrix(json: RepeatedMeasureJSON) {
    if (!isNullOrUndefined(json.correlationMatrix)) {
      return CorrelationMatrix.fromJSON(JSON.stringify(json.correlationMatrix))
    } else {
      return null;
    }
  }

  // fromJSON is used to convert an serialized version
  // of the RepeatedMeasure to an instance of the class
  static fromJSON(json: RepeatedMeasureJSON|string): RepeatedMeasure {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, RepeatedMeasure.reviver);
    } else {
      // create an instance of the StudyDesign class
      const repeatedMeasure = Object.create(RepeatedMeasure.prototype);
      // copy all the fields from the json object
      return Object.assign(repeatedMeasure, json, {
        // convert fields that need converting
        child: this.parseChild(json),
        partialUMatrix: this.parsePartialUMatrix(json),
        correlationMatrix: this.parseCorrelationMatrix(json),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call RepeatedMeasure.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? RepeatedMeasure.fromJSON(value) : value;
  }

  constructor(name?: string) {
    super(name);
    this.nature = constants.HYPOTHESIS_NATURE.WITHIN ;
    this.origin = constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE;

    this.units = '';
    this.type = '';
    this._noRepeats = 0;
    this.partialUMatrix = new PartialMatrix(constants.C_MATRIX_TYPE.MAIN_EFFECT);
    this.correlationMatrix = new CorrelationMatrix(this.valueNames);
    this.standard_deviations = [];
  }

  get noRepeats(): number {
    return this._noRepeats;
  }

  set noRepeats(value: number) {
    this._noRepeats = value;
    this.partialUMatrix.populateUMainEffect(value);
  }

  populatePartialMatrix() {
    if (this.isuFactorNature === constants.CONTRAST_MATRIX_NATURE.GLOBAL_TRENDS) {
      this.partialUMatrix.populateUMainEffect(this.noRepeats);
    } else if (this.isuFactorNature === constants.CONTRAST_MATRIX_NATURE.IDENTITY) {
      this.partialUMatrix.populateIdentityMatrix(this.noRepeats);
    } else if (this.isuFactorNature === constants.CONTRAST_MATRIX_NATURE.POLYNOMIAL) {
      this.partialUMatrix.populatePolynomialEvenSpacing(this.noRepeats);
    }
  }
}
