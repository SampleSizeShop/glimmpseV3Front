import {PowerCurveConfidenceInterval} from './PowerCurveConfidenceInterval';
import {PowerCurveDataSeries} from './PowerCurveDataSeries';

export class PowerCurve {
  private _confidenceInterval: PowerCurveConfidenceInterval;
  private _xAxis: string;
  private _dataSeries: PowerCurveDataSeries[];

  constructor(confidenceInterval?: PowerCurveConfidenceInterval) {
    if (confidenceInterval) {
      this.confidenceInterval = confidenceInterval;
    } else {
      this.confidenceInterval = new PowerCurveConfidenceInterval();
    }
    this._xAxis = 'DesiredPower';
    this._dataSeries = [];
  }

  get confidenceInterval(): PowerCurveConfidenceInterval {
    return this._confidenceInterval;
  }

  set confidenceInterval(value: PowerCurveConfidenceInterval) {
    this._confidenceInterval = value;
  }

  get xAxis(): string {
    return this._xAxis;
  }

  get dataSeries(): PowerCurveDataSeries[] {
    return this._dataSeries;
  }

  set dataSeries(value: PowerCurveDataSeries[]) {
    this._dataSeries = value;
  }
}
