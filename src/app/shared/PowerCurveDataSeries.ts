import {isNullOrUndefined} from 'util';

export class PowerCurveDataSeries {
  private id: string;
  private _power: number;
  private _typeIerror: number;
  private _meanScaleFactor: number;
  private _varianceScaleFactor: number;

  constructor(
    power?: number,
    typeIerror?: number,
    meanScaleFactor?: number,
    varianceScaleFactor?: number) {
    if (!isNullOrUndefined(power)) {
      this.power = power;
    }
    if (!isNullOrUndefined(typeIerror)) {
      this.typeIerror = typeIerror;
    }
    if (!isNullOrUndefined(meanScaleFactor)) {
      this.meanScaleFactor = meanScaleFactor;
    }
    if (!isNullOrUndefined(varianceScaleFactor)) {
      this.varianceScaleFactor = varianceScaleFactor;
    }
  }

  equals (x: PowerCurveDataSeries): boolean {
    let match = false;
    if (this.power === x.power &&
      this.typeIerror === x.typeIerror &&
      this.meanScaleFactor === x.meanScaleFactor &&
      this.varianceScaleFactor === x.varianceScaleFactor) {
      match = true;
    }
    return match
  }

  get power(): number {
    return this._power;
  }

  set power(value: number) {
    this._power = value;
  }

  get typeIerror(): number {
    return this._typeIerror;
  }

  set typeIerror(value: number) {
    this._typeIerror = value;
  }

  get meanScaleFactor(): number {
    return this._meanScaleFactor;
  }

  set meanScaleFactor(value: number) {
    this._meanScaleFactor = value;
  }

  get varianceScaleFactor(): number {
    return this._varianceScaleFactor;
  }

  set varianceScaleFactor(value: number) {
    this._varianceScaleFactor = value;
  }
}
