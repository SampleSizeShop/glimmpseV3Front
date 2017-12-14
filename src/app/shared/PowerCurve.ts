import {PowerCurveConfidenceInterval} from './PowerCurveConfidenceInterval';

export class PowerCurve {
  private _confidenceInterval: PowerCurveConfidenceInterval;

  constructor(confidenceInterval?: PowerCurveConfidenceInterval) {
    if (confidenceInterval) {
      this.confidenceInterval = confidenceInterval;
    } else {
      this.confidenceInterval = null;
    }
  }

  get confidenceInterval(): PowerCurveConfidenceInterval {
    return this._confidenceInterval;
  }

  set confidenceInterval(value: PowerCurveConfidenceInterval) {
    this._confidenceInterval = value;
  }
}
